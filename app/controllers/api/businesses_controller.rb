class Api::BusinessesController < ApplicationController
  def create
    @business = Business.new(business_params)

    if @business.save
      render json: @business
    else
      flash.now[:errors] = @business.errors.full_messages
      render json: @business.errors.full_messages, status: 422
    end
  end

  def update
    @business = Business.find(params[:id])
    if @business.update_attributes(business_params)
      render json: @business
    else
      flash.now[:errors] = @business.errors.full_messages
      render json: @business.errors.full_messages, status: 422
    end
  end

  def show
    render :show
  end

  def index
    query = params[:search][:query]
    location = params[:search][:location]
  end

  private
  def business_params
    params.permit(:business).require(:name, :address, :city, :state, :zip_code, :price_range)
  end
end
