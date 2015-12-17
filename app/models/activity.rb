class Activity < ActiveRecord::Base
  belongs_to :schedule

  validates :start_time, :end_time, :name, presence: true
  validates :name, uniqueness: [:start_time, :end_time]
end
