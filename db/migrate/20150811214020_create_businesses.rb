class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
      t.string :phone_number
      t.string :website_address
      t.integer :price_range, null: false

      t.timestamps null: false
    end

    add_index :businesses, [:address, :city, :state, :zip_code], unique: :true
  end
end
