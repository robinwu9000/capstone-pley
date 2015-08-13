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
    query = params[:query]
    location = params[:location]

    unless query || location
      render json: status:404
    else
      @businesses = Business.filter_businesses(query, location)
      render json: @businesses
    end
  end

  private
  def business_params
    params.permit(:business).require(:name, :address, :city, :state, :zip_code, :price_range)
  end
end
