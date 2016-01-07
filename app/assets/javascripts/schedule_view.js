function ScheduleView(target, schedule, detailView) {
  this.target = target;
  this.schedule = schedule;
  this.detailView = detailView;
}

ScheduleView.prototype.bind = function(event, callback) {
  switch(event) {
    case 'activity_changed':
      $(this.target).on('input', 'div[contenteditable=true]', function(event) {
        callback(ActivityFactory(event.target));
      });
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
        callback(event.target);
      });
      break;
  }
}

ScheduleView.prototype.setChanged = function(activity) {
  $('#activity-' + activity.id).addClass('changed');
}

ScheduleView.prototype.unsetChanged = function(activity) {
  $('#activity-' + activity.id).removeClass('changed');
}

ScheduleView.prototype.setSaved = function(activity) {
  this.unsetChanged(activity);
  $("#activity-" + activity.id).effect('highlight', { color: 'green' }, 2000);
}

ScheduleView.prototype.addActivity = function(req, target) {
  req.done(function(response) {
    $(target)[0].reset();
    $('.activities > ol').append(response);
  })
}

ScheduleView.prototype.wireEvents = function() {
  $(this.target).on('click', '.delete-icon', function(event) {
    var schedule = ScheduleFactory(event.target);
    var activity = ActivityFactory(event.target);

    $.ajax({
      method: 'delete',
      url: '/schedules/' + schedule.id + '/activities/' + activity.id,
      dataType: 'json'
    }).done(function(response) {
      $(event.target).closest('.activity').remove();
    }).fail(function(error) {
      console.log("error!");
    });
  });

  $(this.target).on('click', '.reset-icon', function(event) {
    var el = $(event.target);
    el.closest('.activity').removeClass('changed');
  });


  $('#prior-day').on('click', function(event) {
    var schedule = ScheduleFactory(event.target);
    window.location.replace("/" + schedule.prior_slug());
  });

  $('#next-day').on('click', function(event) {
    var schedule = ScheduleFactory(event.target);
    window.location.replace("/" + schedule.next_slug());
  });
};

