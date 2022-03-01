Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  resources :users, only: %i[show]
  resources :furnitures do
    resources :transactions, only: %i[new create]
  end
  resources :transactions, only: %i[show index destroy edit update]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
