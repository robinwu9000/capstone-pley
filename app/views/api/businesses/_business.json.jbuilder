json.extract! b, :id, :name, :address, :city, :state, :zip_code, :price_range

json.phone_number (!!b.phone_number && !b.phone_number.empty?) ? b.phone_number : "none"
json.website_address (!!b.website_address && !b.phone_number.empty?) ? b.website_address : "none"

total = b.reviews.sum(:rating)

avg_rating = (b.reviews.count == 0 ? 0 : total.to_f / b.reviews.count)

json.avg_rating ((avg_rating*2).round / 2.0)
json.num_reviews b.reviews.count

cats = b.categories.pluck(:category)
json.categories cats.empty? ? ["(pending)"] : cats

json.photos b.photos do |photo|
  username = photo.user.first_name + " "  + photo.user.last_name[0]
  json.id photo.id
  json.username username
  json.path photo.path
  json.compressed photo.compressed ? photo.compressed : photo.path
end

json.reviews b.reviews do |r|
  username = r.user.first_name + " "  + r.user.last_name[0]
  json.id r.id
  json.username username
  json.rating r.rating
  json.description r.description
  json.profile_pic r.user.profile_pic
end
