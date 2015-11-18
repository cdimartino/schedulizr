class ChangeActivityTimeNames < ActiveRecord::Migration
  def change
    change_table :activities do |t|
      t.rename :time_start, :start_time
      t.rename :time_end, :end_time
      t.references :schedule, null: false
    end
  end
end
