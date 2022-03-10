class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :furniture 
  monetize :amount_cents
end
