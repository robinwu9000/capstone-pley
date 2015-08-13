class AddFullAddressToBusiness < ActiveRecord::Migration
  def change
    change_table :businesses do |t|
      t.string :full_address, null: false
    end

    add_index :businesses, :full_address
  end
end
