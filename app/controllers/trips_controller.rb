class TripsController < ApplicationController
	before_action :authenticate_user!

	def index
		@trips = @current_user.trips.all

	end

	def new
		@trip = Trip.new
	end

	def create
		trip = Trip.new(trip_params)
		if trip.save
			add_admin_to_trip(@current_user.id, trip.id)
			flash[:notice]="The trip was succesfully created"
			redirect_to "/trips/#{trip.id}"
		else
			flash[:notice]="There was an error while creating the trip"
			redirect_to "/trips"
		end
	end

	def show
		unless trip.present?
			render :file => 'public/404.html'
		end
		trip
		@users = User.all
		@message = Message.new
		@locations = @trip.locations.order('initdate ASC')
		@location = trip.locations.new
		respond_to do |format|
			format.html
			format.json { render :json => @locations }
		end
	end

	def edit
		locations
	end

	def update
		trip.update(trip_params)
		redirect_to "/trips/#{trip.id}"
	end

	def destroy
		trip.destroy
		redirect_to "/trips"
	end

	def add_admin_to_trip  (user_id, trip_id)
		tripParticipation = TripParticipation.new
		tripParticipation.role = "creator"
		tripParticipation.user = User.find(user_id)
		tripParticipation.trip = Trip.find(trip_id)
		tripParticipation.save
	end

	def add_user_to_trip
		tripParticipation = TripParticipation.new
		tripParticipation.role = "participant"
		tripParticipation.user = User.find(params[:format])
		tripParticipation.trip = Trip.find(params[:id])
		tripParticipation.save
	end

	def delete_user_from_trip
		TripParticipation.find_by(id: params[:id]).destroy
	end

	def add_location_to_trip
		trip
		location = trip.locations.new(location_params)
		if (Trip.validateDates @trip, location) == []
			if location.save
				redirect_to "/trips/#{trip.id}"
			end
		end
	end
	
	private

	def trip_params
		params.require(:trip).permit(:name, :description, :initdate, :enddate);
	end

	def location_params
		params.require(:location).permit(:name, :latitude, :longitude, :initdate, :enddate);
	end

	def trip
		@trip = Trip.includes(:messages).find_by(id: params[:id])
	end
end
