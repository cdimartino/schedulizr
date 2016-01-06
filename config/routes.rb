Rails.application.routes.draw do
  root 'schedules#index'

  get '/today', to: 'schedules#today'

  resources :schedules do
    member do
      patch 'clone'
    end

    resources :activities
  end

  resources :activities
end
