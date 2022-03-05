class FurnituresController < ApplicationController
before_action :set_furniture, only:[:show, :update, :edit, :destroy]

  def index
    @user = current_user
    @furnitures = policy_scope(Furniture).order(created_at: :desc)
  end

  def show
    authorize @furniture
  end

  def new
    @furniture = Furniture.new
    authorize @furniture
  end

  def create
    @user = current_user
    @furniture = Furniture.new(furniture_params)
    authorize @furniture
    @furniture.user = @user
    @furniture.save
    redirect_to controller: "pages", action: "home", id: @furniture.id
    # redirect_to furniture_transactions_path(@furniture)
    
  end

  def edit
  end

  def update
    @furniture.update(furniture_params)
    redirect_to furniture_path(@furniture)
  end

  def destroy
    @furniture.destroy
  end

private

  def set_furniture
    @furniture = Furniture.find(params[:id])
  end

  def furniture_params
    params.require(:furniture).permit(:category, :width, :length, :depth, :shelves, :material)
  end

end
