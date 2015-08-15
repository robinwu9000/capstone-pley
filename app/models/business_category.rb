class BusinessCategory < ActiveRecord::Base
  validates :category_id, :business_id, presence: true
  validates :category_id, uniqueness: {scope: :business_id}

  belongs_to :category
  belongs_to :business
end
