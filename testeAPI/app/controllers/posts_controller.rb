class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :require_authorization!, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = current_user.posts

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    # "post_params.merge(user: current_user)" puts user id in Post 
    @post = Post.new(post_params.merge(user: current_user))

    if @post.save
      render json: {
        status: :created,
        posts: @post
      }
    else
      render json: @post.errors 
    end

  end

  # PATCH/PUT /posts/1
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :content, :user_id)
    end

    def require_authorization!
      unless current_user == @post.user
        render json: {}, status: :forbidden
      end
    end
end
