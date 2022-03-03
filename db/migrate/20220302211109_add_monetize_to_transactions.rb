class AddMonetizeToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :state, :string
    add_column :transactions, :furniture_sku, :string
    add_monetize :transactions, :amount, currency: { present: false }
    add_column :transactions, :checkout_session_id, :string
  end
end
