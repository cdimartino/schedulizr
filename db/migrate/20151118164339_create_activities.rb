class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :time_start, null: false
      t.string :time_end
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
