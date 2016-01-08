var last_refreshed_at;
last_interval = 0;
$(document).ready(function() {
  last_refreshed_at = moment().format('YYYY-MM-DD');
  if ($('.schedule').length > 0) {
    var view = new ScheduleView($('.activities')[0]);
    var controller = new Controller(view);
  }

  // setInterval(function() {
  //   javascript:document.body.style.setProperty("-webkit-transform", "rotate(" + last_interval + "deg)", null);
  //   last_interval++;
  //   // console.log(last_interval);
  // }, 30)
});
