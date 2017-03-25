class TripsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "trips_#{params['trip_id']}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
	  current_user.messages.create!(body: data['message'], trip_id: data['trip_id'])
	end
end
