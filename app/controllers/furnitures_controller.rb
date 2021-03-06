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
    @furniture.price_cents = (@furniture.width + @furniture.length + @furniture.depth) * @furniture.shelves * 5 * 100
    @furniture.save
    redirect_to furniture_path(@furniture)
    
  end

  def edit
  end

  def update
    @furniture.update(furniture_params)
    redirect_to furniture_path(@furniture)
  end

  def destroy
    @furniture.destroy
    authorize @furniture
    redirect_to user_path(current_user)
  end

private

  def set_furniture
    @furniture = Furniture.find(params[:id])
  end

  def furniture_params
    params.require(:furniture).permit(:category, :width, :length, :depth, :shelves, :material)
  end

end
