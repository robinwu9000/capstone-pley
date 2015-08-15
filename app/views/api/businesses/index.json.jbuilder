json.array! @businesses do |b|
  json.extract! b.id, b.name, b.address, b.city, b.state, b.zip_code,
                b.phone_number, b.website_address, b.price_range
end
