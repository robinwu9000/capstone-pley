class Photo < ActiveRecord::Base
  validates :user_id, :business_id, :path, presence: true

  belongs_to :user
  belongs_to :business_id
end
