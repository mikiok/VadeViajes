class UsersController < ApplicationController
	before_filter :authenticate_user!, except: [:index]

	def index
		if user_signed_in?
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

end
