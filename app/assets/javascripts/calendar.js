$(document).ready(function() {
  if ($('#calendar').length > 0) {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,today,next',
        center: 'title',
        right: ''
      },
      editable: false,
      eventLimit: false, // allow "more" link when too many events
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
