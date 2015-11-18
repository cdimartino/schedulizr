class Schedule < ActiveRecord::Base
  has_many :activities

  class << self
    def upcoming
      where(schedule_date: [3.days.ago .. Time.now + 7.days])
    end
  end
end
