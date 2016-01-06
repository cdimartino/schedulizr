class AddUniqueConstraintOnScheduleDate < ActiveRecord::Migration
  def change
    change_column :schedules, :schedule_date, :date, null: false, uniqueness: true
  end
end
