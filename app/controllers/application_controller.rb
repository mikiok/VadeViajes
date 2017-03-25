class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	before_action :configure_permitted_parameters, if: :devise_controller?
	helper_method :resource, :resource_name, :devise_mapping

	 def resource_name
		:user
	end

	def resource
		@resource ||= User.new
	end

	def devise_mapping
		@devise_mapping ||= Devise.mappings[:user]
	end

	protected

	def authenticate_user!(options={})
		if user_signed_in?
			super
		else
			redirect_to '/', :notice => 'if you want to add a notice'
			## if you want render 404 page
			## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
		end
	end

	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:avatar, :firstname, :lastname, :birthdate, :email, :password, :password_confirmation])
	end
end
