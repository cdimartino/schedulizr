class Activity < ActiveRecord::Base
  belongs_to :schedule

  validates :start_time, :name, presence: true
  validates :name, uniqueness: { scope: [:start_time, :end_time, :schedule] }
end
