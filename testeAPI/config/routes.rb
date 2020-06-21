Rails.application.routes.draw do
  resources :posts
  match '*path', via: [:options], to: lambda {|_| [204, { 'Content-Type' => 'text/plain' }]}

  # Session Related
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get 'logged_in', to: 'sessions#is_logged_in?'

  #Post related
  
  resources :posts
  resources :users, only: [:create, :show, :index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
