class SchedulesController < ApplicationController
  def index
    @schedules = Schedule.upcoming
    if @schedules.empty?
      redirect_to action: "new"
    end
  end

  def create
    @schedule = Schedule.new(schedule_params)
    if @schedule.save
      redirect_to @schedule
    else
      render :new
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
