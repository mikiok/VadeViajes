Rails.application.routes.draw do

	
	root to: 'users#index'
	get '/users', to: 'users#show_users'

  devise_for :users
  resources :trips
  get '/users/:id', to: 'users#show'
  post '/user/upload', to: 'users#upload_avatar'
  post '/trips/:id', to: 'trips#add_location_to_trip'
  post '/trips/:id/add_user', to: 'trips#add_user_to_trip', as: 'add_user'
  delete '/trips/:id/location/destroy', to: 'locations#destroy', as: 'location'
  mount ActionCable.server => '/cable'
  #get 'users/:id', to: 'users#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
