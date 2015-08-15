json.array! @businesses do |b|
  json.extract! b, :id, :name, :address, :city, :state, :zip_code,
                :phone_number, :website_address, :price_range

  total = b.reviews.sum(:rating)

  rating = (b.reviews.count == 0 ? 0 : total.to_f / b.reviews.count)

  json.rating ((rating*2).round / 2.0)

  json.categories do
    b.categories
  end
end
