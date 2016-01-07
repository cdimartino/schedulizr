class SchedulesController < ApplicationController
  def index
    @schedules = Schedule.around
    if @schedules.empty?
      redirect_to action: "new"
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

    schedule = Schedule.find(params[:id])
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
