class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :business_id, null: false
      t.integer :rating, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :reviews, :user_id
    add_index :reviews, :business_id
  end
end
