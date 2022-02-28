class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.string :payment_method
      t.date :shipping_time
      t.references :user, null: false, foreign_key: true
      t.references :furniture, null: false, foreign_key: true

      t.timestamps
    end
  end
end
