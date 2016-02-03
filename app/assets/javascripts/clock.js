function Clock(target) {
  this.timerID = null;
  this.timerRunning = false;
  this.target = target;
}

Clock.prototype.start = function() {
  this.stop();
  this.show();
}

Clock.prototype.stop = function() {
  if (this.timerRunning) {
    clearTimeout(this.timerID);
  }
  this.timerRunning = false;
}

Clock.prototype.now = function() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  return hours + ((minutes < 10) ? ":0" : ":") + minutes;
}
Clock.prototype.show = function() {
  $(this.target).html(this.now());
  this.timerID = setTimeout(this.show.bind(this), 1000)
  this.timerRunning = true
}
