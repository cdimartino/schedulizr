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

function Controller(view) {
  this.view = view;
  this.wireEvents();
}

Controller.prototype.wireEvents = function() {
  this.view.bind('activity_changed', this.notifyActivityChanged.bind(this));
  this.view.bind('activity_saved', this.notifyActivitySaveAttempt.bind(this));
}

Controller.prototype.notifyActivityChanged = function(activity) {
  this.view.setChanged(activity);
}

Controller.prototype.notifyActivitySaveAttempt = function(activity) {
  activity.persist().then(function(response) {
    this.view.setSaved(activity);
  }.bind(this));
}

function refresh() {
  return setTimeout(function() {
    location.reload();
  }, 120000);
}
