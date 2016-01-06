function Schedule(el) {
  Object.assign(this, el);
}

Schedule.prototype.prior_slug = function() {
  return moment(this.schedule_date).subtract(1, 'days').format('YYYY-MM-DD')
};

Schedule.prototype.next_slug = function() {
  return moment(this.schedule_date).add(1, 'days').format('YYYY-MM-DD')
};


function Schedulizer(el) {
  var sched = $(el).closest('.schedule');
  return new Schedule({
    id: sched.data('schedule-id'),
    schedule_date: sched.data('schedule-date'),
    activities: Activitizer.from_schedule_element(sched[0], this)
  });
}
