json.array! @businesses do |b|
  json.extract! b, :id, :name, :address, :city, :state, :zip_code,
                :phone_number, :website_address, :price_range

  total = b.reviews.sum(:rating)

  json.rating (b.reviews.count == 0 ? 0 : total / b.reviews.count)

  json.categories do
    b.categories
  end
end
