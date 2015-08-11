class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :user_id, null: false
      t.integer :business_id, null: false
      t.string :path, null: false

      t.timestamps null: false
    end

    add_index :photos, :user_id
    add_index :photos, :business_id
  end
end
