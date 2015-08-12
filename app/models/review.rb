class Review < ActiveRecord::Base
  validates :user_id, :business_id, :rating, presence: true

  belongs_to :user
  belongs_to :business
end
