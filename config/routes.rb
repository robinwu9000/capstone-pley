Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, except: [:index, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :businesses, except: [:new, :edit]
    resources :reviews, only: [:index, :create, :update, :destroy]
    resources :users, only: [:show]
    resources :photos, only: [:index, :create, :destroy]
  end
end
