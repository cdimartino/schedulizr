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
  return new Schedule({
    id: $(el).closest('.schedule').data('schedule-id'),
    schedule_date: $(el).closest('.schedule').data('schedule-date')
  });
}
