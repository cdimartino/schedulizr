$(document).ready(function() {
  var view = new ScheduleView($('.activities')[0]);
  var controller = new Controller(view);

  var refresher = refresh();
  $(document).on('mousemove', function() {
    clearTimeout(refresher);
    refresher = refresh();
  });
});

function Controller(view) {
  this.view = view
  view.controller = this

  view.wireEvents();
}

function refresh() {
  return setTimeout(function() {
    location.reload();
  }, 30000);
}
