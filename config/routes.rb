Rails.application.routes.draw do
  root 'schedules#index'

  resources :schedules do
    resources :activities
  end

  resources :activities
end
