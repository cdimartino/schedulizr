class Schedule < ActiveRecord::Base
  has_many :activities

  validates :schedule_date, uniqueness: true, presence: true

  def display_date format='%A, %B %d, %Y'
    schedule_date.strftime(format)
  end

  def ordered_activities
    activities.order('start_time asc, end_time asc')
  end

  def deep_clone date
    dup.tap do |me|
      me.activities = activities.map { |a|
        a.dup.tap { |copy| copy.schedule_id = nil }
      }
      me.schedule_date = date
    end
  end

  def slug
    schedule_date.strftime('%Y-%m-%d')
  end

  class << self
    def upcoming
      where(schedule_date: [3.days.ago .. Time.now + 7.days])
    end

    def around
      where(schedule_date: [14.days.ago .. Time.now + 14.days])
    end

    def today
      find_by(schedule_date: Date.today)
    end
  end
end
