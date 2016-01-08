$(document).ready(function() {
  if ($('#calendar').length > 0) {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,today,next',
        center: 'title',
        right: ''
      },
      editable: true,
      eventLimit: false, // allow "more" link when too many events
      eventDrop: function(event, delta, revertFunc) {
        var initial_date = moment(event.start - delta).add(1, 'days').format('YYYY-MM-DD');
        $.ajax({
          url: "/schedules/" + initial_date + "/clone",
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
          },
          data: {
            date: event.start.format('YYYY-MM-DD')
          },
          method: 'post'
        }).done(function(response) {
          $('#calendar').fullCalendar('refetchEvents')
        }).fail(function(err) {
          alert("Could not clone")
        })
      },

      events: function(start, end, timezone, callback) {
        $.ajax({
          url: '/schedules.json',
          dataType: 'json',
          data: {
            start: start.unix(),
            end: end.unix()
          }
        }).then(function(response){
          callback(response.map(function(el) {
            return {
              title: el.schedule_date + ": " + el.activities.length + " events",
              start: el.schedule_date,
              allDay: true,
              url: '/' + el.schedule_date
            }
          }));
        }).fail(function(err) {
          console.log("Could not fetch events");
        });
      }
    });
  }
});
