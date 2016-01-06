function ScheduleView(target, schedule, detailView) {
  this.target = target;
  this.schedule = schedule;
  this.detailView = detailView;
}

ScheduleView.prototype.bind = function(event, callback) {
  if (event == 'activity_changed') {
    $(this.target).on('input', 'div[contenteditable=true]', function(event) {
      callback(ActivityFactory(event.target));
    });
  }
  else if ( event == 'activity_saved') {
    $(this.target).on('click', '.save-icon', function(event) {
      callback(ActivityFactory(event.target));
    });
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

ScheduleView.prototype.wireEvents = function() {
  $('#clone-date-modal').on('click', 'form .save', function(event) {
    var form = $(event.target).closest('form')[0];
    form.submit();
  });

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

  $('#new_activity').on('submit', function(event) {
    event.preventDefault();
    // var form = $(event.target).closest('form')[0];

    $.ajax({
      method: event.target.method,
      url: event.target.action,
      data: $(event.target).serialize(),
      dataType: 'html'
    }).done(function(response) {
      $(event.target)[0].reset();
      $('.activities > ol').append(response);
    }).fail(function(error) {
      console.log("Could not add an activity");
    });
  });

  $('h1 .date').on('click', function(event) {
    $('#new-activity').toggle();
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

