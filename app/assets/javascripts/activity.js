function Activity(obj) {
  Object.assign(this, obj);
}

function Activitizer(el, schedule) {
  el = $(el).closest('.activity');
  return new Activity({
    id:         el.data('activity-id'),
    start_time: el.find('.start_time').html().trim(),
    end_time:   el.find('.end_time').html().trim(),
    name:       el.find('.name').html().trim(),
    schedule: schedule
  });
}

Activitizer.from_schedule_element = function(el) {
  return $(el).find('.activity').map(function(idx, activity_row) {
    return new Activitizer(activity_row, this);
  });
}
