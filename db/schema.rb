# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150819233020) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_categories", force: :cascade do |t|
    t.integer  "category_id", null: false
    t.integer  "business_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "business_categories", ["business_id"], name: "index_business_categories_on_business_id", using: :btree
  add_index "business_categories", ["category_id"], name: "index_business_categories_on_category_id", using: :btree

  create_table "businesses", force: :cascade do |t|
    t.string   "name",            null: false
    t.string   "address",         null: false
    t.string   "city",            null: false
    t.string   "state",           null: false
    t.string   "zip_code",        null: false
    t.string   "phone_number"
    t.string   "website_address"
    t.integer  "price_range",     null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "longitude"
    t.string   "latitude"
    t.string   "full_address",    null: false
  end

  add_index "businesses", ["address", "city", "state", "zip_code"], name: "index_businesses_on_address_and_city_and_state_and_zip_code", unique: true, using: :btree
  add_index "businesses", ["full_address"], name: "index_businesses_on_full_address", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "category",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "photos", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "business_id", null: false
    t.string   "path",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "comment"
    t.string   "compressed"
  end

  add_index "photos", ["business_id"], name: "index_photos_on_business_id", using: :btree
  add_index "photos", ["user_id"], name: "index_photos_on_user_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "business_id", null: false
    t.integer  "rating",      null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "reviews", ["business_id"], name: "index_reviews_on_business_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "profile_pic"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
