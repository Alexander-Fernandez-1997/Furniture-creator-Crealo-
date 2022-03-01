class CreateTextures < ActiveRecord::Migration[6.1]
  def change
    create_table :textures do |t|
      t.string :name
      t.string :url

      t.timestamps
    end
  end
end
