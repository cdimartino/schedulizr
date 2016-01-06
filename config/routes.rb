Rails.application.routes.draw do
  root 'schedules#today'

  get '/today', to: 'schedules#today'

  get '/:date', to: 'schedules#by_date', constraints: { date: /\d{4}-\d{2}-\d{2}/ }
  get '/schedules/:date', to: 'schedules#by_date', constraints: { date: /\d{4}-\d{2}-\d{2}/ }

  resources :schedules do
    member do
      patch 'clone'
    end

    resources :activities
  end

  resources :activities
end
