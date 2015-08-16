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
    query = params[:query] || ""
    location = params[:location] || ""

    if location.empty?
      @businesses = Business.order("updated_at DESC").limit(10)
    else
      @businesses = Business.filter_businesses(query, location)
    end

    render :index
  end

  private
  def business_params
    params.require(:business).permit(:name, :address, :city, :state, :zip_code,
                                     :price_range, :phone_number, :website_address)
  end
end
