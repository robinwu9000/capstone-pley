class Category < ActiveRecord::Base
  validates :category, presence: true
end
