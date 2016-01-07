function ScheduleView(target, schedule, detailView) {
  this.target = target;
  this.schedule = schedule;
  this.detailView = detailView;
}

ScheduleView.prototype.bind = function(event, callback) {
  switch(event) {
    case 'activity_changed':
      $(this.target).on('input', 'div[contenteditable=true]', function(event) {
        this.setChanged(ActivityFactory(event.target));
      }.bind(this));
      break;

    case 'activity_saved':
      $(this.target).on('click', '.save-icon', function(event) {
        callback(ActivityFactory(event.target));
      });
      break;

    case 'toggle_new_activity':
      $('h1 .date').on('click', function(event) {
        $('#new-activity').toggle();
      });
      break;

    case 'activity_created':
      $('#new_activity').on('submit', function(event) {
        event.preventDefault();
        callback(event);
      });
      break;

    case 'activity_deleted':
      $(this.target).on('click', '.delete-icon', function(event) {
        callback(ActivityFactory(event.target));
      });
      break;

    case 'next_day':
      $('#next-day').on('click', function(event) {
        var schedule = ScheduleFactory(event.target);
        window.location.replace("/" + schedule.next_slug());
      });
      break;

    case 'prior_day':
      $('#prior-day').on('click', function(event) {
        var schedule = ScheduleFactory(event.target);
        window.location.replace("/" + schedule.prior_slug());
      });
      break;

    case 'reset_activity':
      $(this.target).on('click', '.reset-icon', function(event) {
        var el = $(event.target);
        el.closest('.activity').removeClass('changed');
      });
      break;
  }
};

ScheduleView.prototype.setChanged = function(activity) {
  $('#activity-' + activity.id).addClass('changed');
};

ScheduleView.prototype.unsetChanged = function(activity) {
  $('#activity-' + activity.id).removeClass('changed');
};

ScheduleView.prototype.setSaved = function(activity) {
  this.unsetChanged(activity);
  $("#activity-" + activity.id).effect('highlight', { color: 'green' }, 2000);
};

ScheduleView.prototype.addActivity = function(req, target) {
  req.done(function(response) {
    $(target)[0].reset();
    $('.activities > ol').append(response);
  });
};

ScheduleView.prototype.deleteActivity = function(req, activity) {
  req.done(function() {
    $('#activity-' + activity.id).remove();
  });
};

ScheduleView.prototype.reloadActivities = function() {

}
