username = photo.user.first_name + " "  + photo.user.last_name[0]
json.id photo.id
json.username username
json.path photo.path
json.compressed photo.compressed ? photo.compressed : photo.path
