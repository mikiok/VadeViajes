class LocationsController < ApplicationController
	before_action :authenticate_user!

	def new
	end


	def create
	end

	def update
	end

	def destroy
		Location.find_by(id: params[:id]).destroy
		redirect_to "/trips/#{params[:format]}"
	end
end
