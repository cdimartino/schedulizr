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
    schedule = Schedule.find(params[:id])
    cloned = schedule.deep_clone(params[:date])

    if cloned.save
      redirect_to "/#{cloned.slug}"
    else
      #TODO: Allow user to overwrite when cloning?
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
