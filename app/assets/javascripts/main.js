function Controller(target) {
  this.target = target
}

$(document).ready(function() {
  var controller = new Controller($('.activities')[0]);

  $('.activities').on('input', 'div[contenteditable=true]', function(event) {
    $(event.target).closest('.activity').addClass('changed');
  });

  $('#clone-date-modal').on('click', 'form .save', function(event) {
    var form = $(event.target).closest('form')[0];
    form.submit();
  });

  $('.activities').on('click', '.save-icon', function(event) {
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

  $('.activities').on('click', '.delete-icon', function(event) {
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

  $('.activities').on('click', '.reset-icon', function(event) {
    var el = $(event.target);
    el.closest('.activity').removeClass('changed');
  });

  $('#new_activity').on('click', 'button', function(event) {
    var form = $(event.target).closest('form')[0];

    $.ajax({
      method: form.method,
      url: form.action,
      data: $(form).serialize(),
      dataType: 'html'
    }).done(function(response) {
      $(form)[0].reset();
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
    window.location.replace(schedule.prior_slug());
  });

  $('#next-day').on('click', function(event) {
    var schedule = Schedulizer(event.target);
    window.location.replace(schedule.next_slug());
  });
});
