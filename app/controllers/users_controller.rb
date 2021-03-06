class UsersController < ApplicationController
	before_filter :authenticate_user!, except: [:index]

	def index
		if user_signed_in?
			@trip = Trip.new
			render 'index'
		else
			render 'static_pages/landing'
		end
	end
	
	def show
		@user = User.find_by(id: params[:id])
		render :show
	end

	def show_users
		@users = User.all.map do |user|
			{:fullname => user.firstname + " " + user.lastname, :id => user.id, :avatar => user.avatar}
		end
		respond_to do |format|
		  format.html
		  format.json { render :json => @users }
		end
		@searchedUsers = User.where("CONCAT_WS(' ', lower(firstname), lower(lastname)) like ?", "%#{params[:name]}%".downcase)
	end

	def upload_avatar
		if @current_user.update_attribute(:avatar, params[:user][:avatar])
			redirect_to "/users/#{@current_user.id}"
		end
	end

end
