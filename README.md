# capstone-pley
aka a Yelp Clone

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
 + can edit/suggest changes to business details
 + have business owner accounts
  
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

### Reviews 
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| user_id | integer | not null, foreign key |
| business_id | integer | not null, foreign key |
| rating | integer | not null, between 1-5 |
| description | text | optional |
| helpful | integer | used to sort reviews (people can +1/-1) |

### Business
| column | type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |
| address | string | not null, uniqueness by zip code, city, and state |
| city | string | not null |
| state | string | 2 characters maximum |
| zip_code | integer | not null |
| phone_number | string (integer?) | may be null |
| website_address | string | may be null |
| overall_rating | integer | may be null or default 0 |
| price_rating | integer | not null, between 1-5 |


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


## Implementation Timeline
### Phase 1: 
