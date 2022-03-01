class FurnituresController < ApplicationController
before_action :set_furniture, only:[:show, :update, :edit, :destroy]

  def index
    @furnitures = Furniture.all
  end

  def show
  end

  def new
    @furniture = Furniture.new
  end

  def create
    @user = current_user
    @furniture = Furniture.new(furniture_params)
    @furniture.user = @user
    @furniture.save
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
