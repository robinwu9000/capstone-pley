class Api::ReviewsController < ApplicationController
  def index
    biz_id = params[:biz_id]
    user_id = params[:user_id]
    if(biz_id)
      @reviews = Review.where(business_id: biz_id).page(params[:page])
    else
      @reviews = Review.where(user_id: user_id).page(params[:page])
    end

    render :index
  end

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id

    if @review.save
      render partial: "api/reviews/review", locals: {r: @review}
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update_attributes(review_params)
      render json: @review
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    render json: @review
  end

  private
  def review_params
    params.require(:review).permit(:business_id, :rating, :description)
  end
end
