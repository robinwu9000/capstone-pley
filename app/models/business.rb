class Business < ActiveRecord::Base
  validates :name, :address, :city, :state, :zip_code, :price_range, :full_address, presence: true
  validates :address, uniqueness: {scope: [:city, :state, :zip_code]}
  validates :price_range, inclusion: 1..5
  validates :state, length: {is: 2}
  validates :zip_code, length: {is: 5}
  validates :phone_number, length: {is: 12}, allow_blank: true

  before_validation :concat_address_fields, :format_phone_number

  before_save do
    self.name.downcase!
  end

  has_many :reviews
  has_many :photos, :order => "created_at DESC"
  has_many :business_categories
  has_many :categories, through: :business_categories, source: :category

  def concat_address_fields
    self.full_address = "#{self.address} #{self.city} #{self.state} #{self.zip_code}".downcase
  end

  def self.filter_businesses(query, location)
    location.strip!
    location.downcase!
    query.strip!

    business_by_location = Business.where("full_address ILIKE ?", "%#{location}%")
    business_with_cats = business_by_location.joins(<<-SQL)
      LEFT OUTER JOIN
        business_categories as bc
      ON
        businesses.id = bc.business_id
      LEFT OUTER JOIN
        categories
      ON
        bc.category_id = categories.id
    SQL

    business_with_cats.where("name ILIKE ? OR category ILIKE ?", "%#{query}%", query)
  end

  def format_phone_number
    unless self.phone_number.empty?
      self.phone_number = self.phone_number.gsub(/\D/, '')
      self.phone_number.insert(3, '-')
      self.phone_number.insert(-5,'-')
    end
  end
end
