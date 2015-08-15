class Category < ActiveRecord::Base
  validates :category, presence: true, uniqueness: {case_sensitive: false}

  before_save do
    self.category.capitalize!
  end

  has_many :business_categories
end
