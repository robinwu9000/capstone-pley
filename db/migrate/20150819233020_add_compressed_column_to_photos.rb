class AddCompressedColumnToPhotos < ActiveRecord::Migration
  def change
    change_table :photos do |t|
      t.string :compressed
    end
  end
end
