module ApplicationHelper
  def time_format time
    return unless time
    time.strftime('%H:%M')
  end
end
