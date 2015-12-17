class Schedule < ActiveRecord::Base
  has_many :activities

  validates :schedule_date, uniqueness: true
  validates :schedule_date, presence: true

  def display_date format='%A, %B %d, %Y'
    schedule_date.strftime(format)
  end

  def ordered_activities
    activities.order('start_time asc, end_time asc')
  end

  class << self
    def upcoming
      where(schedule_date: [3.days.ago .. Time.now + 7.days])
    end
  end
end
