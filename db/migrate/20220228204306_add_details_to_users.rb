class AddDetailsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :address, :string
    add_column :users, :fullname, :string
  end
end
