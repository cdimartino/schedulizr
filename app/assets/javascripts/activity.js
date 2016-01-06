function Activity(obj) {
  Object.assign(this, obj);
}

Activity.prototype.to_json = function() {
  return {
    activity: {
      start_time: this.start_time,
      end_time: this.end_time,
      id: this.id,
      name: this.name
    }
  }
}
Activity.prototype.persist = function() {
  return $.ajax({
    method: 'PUT',
    url: '/schedules/' + this.schedule.id + '/activities/' + this.id,
    dataType: 'json',
    data: this.to_json()
  })
}

function ActivityFactory(el, schedule) {
  el = $(el).closest('.activity');
  sched = schedule || ScheduleFactory(el);
  return new Activity({
    id:         el.data('activity-id'),
    start_time: el.find('.start_time').html().trim(),
    end_time:   el.find('.end_time').html().trim(),
    name:       el.find('.name').html().trim(),
    schedule: sched
  });
}

ActivityFactory.from_schedule_element = function(el) {
  return Array.prototype.slice.call(
    $(el).find('.activity').map(
      function(idx, activity_row) {
        return new ActivityFactory(activity_row, ScheduleFactory(el));
      }
    )
  );
}
