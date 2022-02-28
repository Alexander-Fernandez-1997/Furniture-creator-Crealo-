class TransactionsController < ApplicationController
  before_action :set_transaction, only: :show
  def index
    #@transactions = policy_scope(Transaction).order(created_at: :desc)
  end

  def show
    #@transactions = policy_scope(Transaction).order(created_at: :desc)
  end

  def create
    @transaction = Transaction.new
    #authorize @transaction
    @furniture = Furniture.find(params[:furniture_id])
    @transaction.furniture = @furniture
    @transaction.user = current_user
    @furniture.user.save
    @furniture.user = @transaction.user
    @furniture.save
    @transaction.save
    redirect_to furniture_path(@furniture)
  end

  private

  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  def furniture_params
    params.require(:transaction).permit(:user, :furniture)
  end
end
