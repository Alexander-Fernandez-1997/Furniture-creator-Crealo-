class CreateFurnitures < ActiveRecord::Migration[6.1]
  def change
    create_table :furnitures do |t|
      t.string :category, default: "bookshelf"
      t.integer :width, default: 60
      t.integer :length, default: 180
      t.integer :depth, default: 30
      t.integer :shelves, default: 5
      t.string :material, default: "white"
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
