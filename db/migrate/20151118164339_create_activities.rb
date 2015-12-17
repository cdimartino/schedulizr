class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.time :time_start, null: false
      t.time :time_end
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
