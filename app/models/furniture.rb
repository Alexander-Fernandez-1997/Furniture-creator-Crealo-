class Furniture < ApplicationRecord
  belongs_to :user
  monetize :price_cents
  has_many :transactions , dependent: :destroy
end
