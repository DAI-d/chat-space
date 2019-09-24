Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # get 'users/index' => 'users#index' #追記
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end