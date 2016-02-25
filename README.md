# capstone-pley
[A Restaurant Search and Review app](https://pley-app.herokuapp.com/)

## Minimum Viable Product
The main functionality of Yelp is to search for a business and give reviews:
+ without logging in:
  + can search for a business
  + can search by location and category
  + view business details and photos
+ with user login:
  + can write a review
  + can add photos
  + can add a business

## Wireframes
#### Home/Landing page: https://wireframe.cc/6nX79G
#### Signup and Login pages: https://wireframe.cc/BKwAfu
#### Business Show page: https://wireframe.cc/UmKvB7
#### Search page: essentially the same as landing page, except with a map on the side
#### Add Review page: https://wireframe.cc/Mvyp5S
#### Add Business page: http://i.imgur.com/rOZ1jzu.png

## Database schema
### Users
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key|
| email | string | not null, unique |
| name | string | not null |
| password_digest | string | not null |
| session_token | string | not null, unique |
| profile_pic | string | optional |

### Reviews
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| user_id | integer | not null, foreign key |
| business_id | integer | not null, foreign key |
| rating | integer | not null, between 1-5 |
| description | text | optional |

### Business
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |
| address | string | not null, uniqueness by zip code, city, and state |
| city | string | not null |
| state | string | 2 characters maximum |
| zip_code | integer | not null |
| phone_number | string (integer?) | optional |
| website_address | string | optional |
| price_rating | integer | not null, between 1-5 |
| latitude | string | bonus functionality |
| longitude | string | bonus functionality |


### Categories
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| category | string | not null, limited to an array of categories |
| business_id | integer | not null, foreign_key |


### Photos
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| user_id | integer | not null, foreign key |
| business_id | integer | not null, foreign key |
| path | string | not null, where to fetch the photo from |
| comment | string | optional |

## Implementation Timeline
### Phase 1: Search and View Business (4~5 days)
A search through categories or by name and location should return accurate results. You should then be able to see click on a result and view the business in more depth. There should be reviews and photos to see. These are functions that don't require login, which is a major inconvenience for the purpose of the site. The site will be almost fully functional at this point. The main models should be implemented, and all the frontend views need to be implemented as well. Styling most likely will come later.

### Phase 2: User authentication, Adding Reviews and Businesses (2~3 days)
The rest of the site requires user login, so that needs to be implemented for the rest of the features to work correctly. The user should then be able to submit a review to existing businesses, and add one if what they are looking for is not there. This mostly consists of adding the forms for logging in, signing up, making a review, and adding a business.

### Phase 3: Styling (2 days)
The Bootstrapping and CSS will be implemented in this time.


## Bonus
+ can view users and their reviews
+ can edit/suggest changes to business details
+ have business owner accounts
+ integrate Google maps
+ can filter based by distance from current location
+ add more details to a business
  + subsequently be able to filter by these details
