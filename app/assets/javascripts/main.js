$(document).ready(function() {
  if ($('.schedule').length > 0) {
    var view = new ScheduleView($('.activities')[0]);
    var controller = new Controller(view);
  }
});
