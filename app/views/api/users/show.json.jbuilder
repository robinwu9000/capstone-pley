json.extract! @user
json.reviews do
  json.array! @user.reviews
end
