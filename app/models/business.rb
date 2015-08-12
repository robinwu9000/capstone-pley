class Business < ActiveRecord::Base
  validates :name, :address, :city, :state, :zip_code, :price_range, presence: true
  validates :address, uniqueness: {scope: [:city, :state, :zip_code]}
  validates :price_range, inclusion: 1..5
  validates :state, length: {is: 2}
  validates :zip_code, length: {is: 5}
end
