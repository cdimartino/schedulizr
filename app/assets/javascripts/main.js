$(document).ready(function() {
  var view = new ScheduleView($('.activities')[0]);
  var controller = new Controller(view);
});

function Controller(view) {
  this.view = view
  view.controller = this

  view.wireEvents();
}
