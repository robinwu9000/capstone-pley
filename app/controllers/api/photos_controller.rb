class Api::PhotosController < ApplicationController
  def index
    biz_id = params[:biz_id]
    user_id = params[:user_id]
    if(biz_id)
      @photos = Photo.where(business_id: biz_id).page(params[:page])
    else
      @photos = Photo.where(user_id: user_id).page(params[:page])
    end

    render :index
  end

  def create
    @photo = Photo.new(photo_params)
    @photo.user_id = current_user.id
    if @photo.save
      render json: @photo
    else
      render json: @photo.errors.full_messages
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    render json: @photo
  end

  private
  def photo_params
    params.require(:photo).permit(:path, :business_id, :comment)
  end
end
