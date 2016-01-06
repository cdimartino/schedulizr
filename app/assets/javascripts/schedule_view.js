function ScheduleView(target, schedule) {
  this.target = target;
  this.schedule = schedule;
}

ScheduleView.prototype.wireEvents = function() {
  $(this.target).on('input', 'div[contenteditable=true]', function(event) {
    $(event.target).closest('.activity').addClass('changed');
  });

  $('#clone-date-modal').on('click', 'form .save', function(event) {
    var form = $(event.target).closest('form')[0];
    form.submit();
  });

  $(this.target).on('click', '.save-icon', function(event) {
    var schedule = Schedulizer(event.target);
    var activity = Activitizer(event.target);

    $.ajax({
      method: 'PUT',
      url: '/schedules/' + schedule.id + '/activities/' + activity.id,
      data: { activity: activity }
    }).done(function(response) {
      $("#activity_" + response.id).effect('highlight', { color: 'green' }, 2000);
      $("#activity_" + response.id).removeClass('changed');
    }).fail(function(error) {
      $("#activity_" + response.id).effect('highlight', { color: 'red' }, 2000);
    });
  });

  $(this.target).on('click', '.delete-icon', function(event) {
    var schedule = Schedulizer(event.target);
    var activity = Activitizer(event.target);

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
    var schedule = Schedulizer(event.target);
    window.location.replace("/" + schedule.prior_slug());
  });

  $('#next-day').on('click', function(event) {
    var schedule = Schedulizer(event.target);
    window.location.replace("/" + schedule.next_slug());
  });
}

