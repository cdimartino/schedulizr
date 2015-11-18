class SchedulesController < ApplicationController
  def index
    @schedules = Schedule.upcoming
    if @schedules.empty?
      redirect_to action: "new"
    end
  end

  def new
    @schedule = Schedule.new
  end

  def show
    @schedule = Schedule.find(params[:id])
  end

  def create
  end
end
