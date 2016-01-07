function Controller(view) {
  this.view = view;
  this.wireEvents();
  this.refreshInterval = 5000;
  this.autoRefreshActivities();
}

Controller.prototype.autoRefresh = function() {
  var refresher = refresh.call(this);
  $(document).on('mousemove', function() {
    clearTimeout(refresher);
    refresher = refresh.call(this);
  });

  function refresh() {
    return setTimeout(function() {
      this.view.reloadActivities();
    }.bind(this), this.refreshInterval);
  }.bind(this);
};

Controller.prototype.wireEvents = function() {
  this.view.bind('activity_changed', this.notifyActivityChanged.bind(this));
  this.view.bind('activity_saved', this.notifyActivitySaveAttempt.bind(this));
  this.view.bind('activity_created', this.notifyActivityCreateAttempt.bind(this));
  this.view.bind('activity_deleted', this.notifyActivityDeleteAttempt.bind(this));
  this.view.bind('clone_schedule');
  this.view.bind('toggle_new_activity');
  this.view.bind('prior_day');
  this.view.bind('next_day');
  this.view.bind('reset_activity');
};

Controller.prototype.notifyActivitySaveAttempt = function(activity) {
  activity.persist().then(function(response) {
    this.view.setSaved(activity);
  }.bind(this));
};

Controller.prototype.notifyActivityCreateAttempt = function(event) {
  var req = $.ajax({
    method: event.target.method,
    url: event.target.action,
    data: $(event.target).serialize(),
    dataType: 'html'
  }).fail(function(error) {
    console.log("Could not add an activity");
  });

  this.view.addActivity(req, event.target);
};

Controller.prototype.notifyActivityDeleteAttempt = function(activity) {
  var req = $.ajax({
    method: 'delete',
    url: '/schedules/' + activity.schedule.id + '/activities/' + activity.id,
    dataType: 'json'
  }).fail(function(error) {
    console.log("error!");
  });

  this.view.deleteActivity(req, activity);
};