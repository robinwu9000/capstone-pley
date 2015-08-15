class Review < ActiveRecord::Base
  validates :user_id, :business_id, :rating, presence: true
  validates :rating, inclusion: 1..5

  belongs_to :user
  belongs_to :business
end
