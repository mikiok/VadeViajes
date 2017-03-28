class Location < ApplicationRecord
	belongs_to :trip

	validates_presence_of :name, :latitude, :longitude, :initdate, :enddate
end
