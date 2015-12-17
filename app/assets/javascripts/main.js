$(document).ready(function() {
  // var date = new Date(Date.now());
  // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  // document.getElementById('date').innerHTML = date.toLocaleDateString('en-US', options);

  $('.activities').on('input', 'div[contenteditable=true]', function(event) {
    $(event.target).closest('.activity').addClass('changed');
  });

  $('.activities').on('click', '.save-icon', function(event) {
    var schedule = new Schedule(event.target);
    var activity = new Activity(event.target);

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
    var schedule = new Schedule(event.target);
    var activity = new Activity(event.target);

    $.ajax({
      method: 'delete',
      url: '/schedules/' + schedule.id + '/activities/' + activity.id,
      dataType: 'json'
    }).done(function(response) {
      $(event.target).closest('.activity').remove();
    }).fail(function(error) {
      console.log("error!")
    });
  });

  $('.activities').on('click', '.reset-icon', function(event) {
    var el = $(event.target);
    el.closest('.activity').removeClass('changed');
  });

  $('#new_activity').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: event.target.method,
      url: event.target.action,
      data: $(event.target).serialize(),
      dataType: 'html'
    }).done(function(response) {
      $(event.target)[0].reset();
      // make this work!
      // $(event.target).find('input[type=time]')[0].focus()
      $('.activities > ol').append(response);
    }).fail(function(error) {
      console.log("Could not add an activity")
    })
  })

  $('.date h1').on('mouseover', function(event) {
    console.log('hovered')
    $('#new-activity').toggle();
  })
});

function Activity(el) {
  var el = $(el).closest('.activity');

  this.id =         el.data('activity-id');
  this.start_time = el.find('.start_time').html().trim();
  this.end_time =   el.find('.end_time').html().trim();
  this.name =       el.find('.name').html().trim();
}

Schedule = function(el) {
  this.id = $(el).closest('.schedule').data('schedule-id');
}
