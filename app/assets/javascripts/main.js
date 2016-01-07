$(document).ready(function() {
  var view = new ScheduleView($('.activities')[0]);
  var controller = new Controller(view);
  view.controller = controller;

  var refresher = refresh();
  $(document).on('mousemove', function() {
    clearTimeout(refresher);
    refresher = refresh();
  });
});

function refresh() {
  return setTimeout(function() {
    location.reload();
  }, 120000);
}
