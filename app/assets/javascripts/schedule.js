function Schedule(obj) {
  this.id = obj.id;
  this.schedule_date = obj.schedule_date;
}

Schedule.prototype.prior_slug = function() {
  return moment(this.schedule_date).subtract(1, 'days').format('YYYY-MM-DD')
};

Schedule.prototype.next_slug = function() {
  return moment(this.schedule_date).add(1, 'days').format('YYYY-MM-DD')
};


function ScheduleFactory(el) {
  var sched = $(el).closest('.schedule');
  var sched = new Schedule({
    id: sched.data('schedule-id'),
    schedule_date: sched.data('schedule-date'),
  });
  sched.activities = ActivityFactory.from_schedule_element(sched[0], sched)
  return sched;
}
