class ActivitiesController < ActionController::Base
  def update
    @activity = Activity.find_by(id: params[:id])
    if @activity.update(activity_params)
      respond_to do |fmt|
        fmt.json { render json: @activity }
      end
    end
  end

  def create
    schedule = Schedule.find(params[:schedule_id])
    activity = schedule.activities.build(activity_params)
    if activity.save
      respond_to do |fmt|
        fmt.json { render json: activity }
        fmt.html { render partial: 'activity', locals: {activity: activity} }
      end
    else
      render json: activity.errors.full_messages, status: 400
    end
  end

  def destroy
    activity = Activity.find(params[:id])
    if activity.destroy
      respond_to do |fmt|
        fmt.json { head :no_content }
      end
    end
  end

  private

  def activity_params
    params.require(:activity).permit(:name, :start_time, :end_time)
  end
end
