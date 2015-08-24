username = r.user.first_name + " "  + r.user.last_name[0]
json.id r.id
json.username username
json.rating r.rating
json.description r.description
json.profile_pic r.user.profile_pic
