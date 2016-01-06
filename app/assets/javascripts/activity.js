function Activity(el) {
  Object.assign(this, el);
}

function Activitizer(el) {
  el = $(el).closest('.activity');
  return new Activity({
    id:         el.data('activity-id'),
    start_time: el.find('.start_time').html().trim(),
    end_time:   el.find('.end_time').html().trim(),
    name:       el.find('.name').html().trim()
  });
}
