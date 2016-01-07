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
  this.view.bind('clone_schedule');
  this.view.bind('toggle_new_activity');
  this.view.bind('activity_created', this.notifyActivityCreateAttempt.bind(this));
  this.view.bind('prior_day');
  this.view.bind('next_day');
}

Controller.prototype.notifyActivityChanged = function(activity) {
  this.view.setChanged(activity);
}

Controller.prototype.notifyActivitySaveAttempt = function(activity) {
  activity.persist().then(function(response) {
    this.view.setSaved(activity);
  }.bind(this));
}

Controller.prototype.notifyActivityCreateAttempt = function(activity) {
  var req = $.ajax({
    method: event.target.method,
    url: event.target.action,
    data: $(event.target).serialize(),
    dataType: 'html'
  }).fail(function(error) {
    console.log("Could not add an activity");
  });
  this.view.addActivity(req, event.target);
}

function refresh() {
  return setTimeout(function() {
    location.reload();
  }, 120000);
}
