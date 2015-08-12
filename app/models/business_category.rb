class BusinessCategory < ActiveRecord::Base
  validates :category_id, :business_id, presence: true

  belongs_to :category
  belongs_to :business
end
