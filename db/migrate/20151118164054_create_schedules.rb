class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.date :schedule_date, null: false
      t.timestamps null: false
    end
  end
end
