class AddColumnsToPhotosUsersAndBusinesses < ActiveRecord::Migration
  def change
    change_table :businesses do |t|
      t.string :longitude
      t.string :latitude
    end

    change_table :photos do |t|
      t.string :comment
    end

    change_table :users do |t|
      t.string :profile_pic
    end
  end
end
