# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

s1 = Schedule.create(schedule_date: Date.today)
[
  {
    start_time: '9:00',
    end_time:   '10:00',
    name:       'Lecture'
  },
  {
    start_time: '12:30',
    end_time:   '14:00',
    name:       'Lunch'
  },
  {
    start_time: '14:00',
    name:       'Announcements'
  },
  {
    start_time: '17:30',
    end_time:   '18:00',
    name:       'End of Day'
  },
  {
    start_time: '18:00',
    name:       'Go Home'
  },
].each do |a|
  s1.activities.create(a)
end
