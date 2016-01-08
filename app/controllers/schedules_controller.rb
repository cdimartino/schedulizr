class SchedulesController < ApplicationController
  def index
    @schedules = if params[:start] and params[:end]
      Schedule.between(
        Date.strptime(params[:start], '%s'),
        Date.strptime(params[:end], '%s')
      )
    else
      Schedule.around
    end

    if @schedules.empty?
      redirect_to action: "new"
    end

    respond_to do |fmt|
      fmt.html
      fmt.json { render json: @schedules.to_json(include: [:activities]) }
    end
  end

  def today
    if @schedule = Schedule.today
      render :show
    else
      redirect_to action: "new"
    end
  end

  def by_date
    @schedule = Schedule.find_or_create_by(schedule_date: params[:date])
    render :show
  end

  def clone
    if target = Schedule.find_by(schedule_date: params[:date])
      ## The target schedule date exists.  Delete and allow it to be cloned.
      target.destroy
    end

    schedule = \
      if params[:id].match(/^\d\d\d\d-\d\d-\d\d$/)
        Schedule.find_by(schedule_date: params[:id])
      else
        Schedule.find(params[:id])
      end

    cloned = schedule.deep_clone(params[:date])

    if cloned.save
      redirect_to "/#{cloned.slug}"
    end
  end

  def create
    @schedule = Schedule.new(schedule_params)
    if @schedule.save
      redirect_to @schedule
    end
  end

  def new
    @schedule = Schedule.new
  end

  def show
    @schedule = Schedule.find(params[:id])
  end

  private

  def schedule_params
    params.require(:schedule).permit(:schedule_date)
  end
end
