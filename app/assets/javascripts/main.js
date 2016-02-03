var last_refreshed_at;
$(document).ready(function() {
  last_refreshed_at = moment().format('YYYY-MM-DD');
  if ($('.schedule').length > 0) {
    var view = new ScheduleView($('.activities')[0]);
    var controller = new Controller(view);
  }

  (new Clock('span.clock')).start();
});
