class TransactionsController < ApplicationController

  def index
    #@transactions = policy_scope(Transaction).order(created_at: :desc)
  end

  def show
    #@transactions = policy_scope(Transaction).order(created_at: :desc)
    @transaction = current_user.transactions.find(params[:id])
    authorize @transaction
  end

  def create
    
      furniture = Furniture.find(params[:furniture_id])
      transaction = Transaction.create!(furniture: furniture, furniture_sku: furniture.sku, amount: furniture.price, state: 'pending', user: current_user)

      session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        name: furniture.sku,
        amount: furniture.price_cents,
        currency: 'usd',
        quantity: 1
      }],
      success_url: transaction_url(transaction),
      cancel_url: transaction_url(transaction)
    )

    transaction.update(checkout_session_id: session.id)
    redirect_to new_transaction_payment_path(transaction)

    
  end

  private

  def furniture_params
    params.require(:transaction).permit(:user, :furniture)
  end
end
