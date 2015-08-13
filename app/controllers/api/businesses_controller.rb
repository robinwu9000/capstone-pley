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

    @businesses = filter_businesses(query, location)

    render json: @businesses
  end

  private
  def business_params
    params.permit(:business).require(:name, :address, :city, :state, :zip_code, :price_range)
  end

  def filter_businesses(query, location)
    business_by_location = Business.where("full_address LIKE ?", "%#{location}%")
    business_with_cats = business_by_location.join(<<-SQL)
      LEFT OUTER JOIN
        business_categories as bc
      ON
        businesses.id = bc.business_id
      JOIN
        categories
      ON
        bc.category_id = categories.id
    SQL
  end
end
