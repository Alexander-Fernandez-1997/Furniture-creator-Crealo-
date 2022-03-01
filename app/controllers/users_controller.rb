class UsersController < ApplicationController

  def show
    @textures = Texture.all
    authorize @textures
    @user = User.find(params[:id])
    authorize @user
  end


end
