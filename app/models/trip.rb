class Trip < ApplicationRecord
	has_many :users, through: :trip_participations
	has_many :trip_participations, dependent: :destroy
	has_many :locations, dependent: :destroy
	has_many :messages, dependent: :destroy

	has_attached_file :logo, styles: {:medium => "300x300>", 
  		:small => "40x40>", :thumb => "100x100>", :big => "500x500>"}

  validates_presence_of :name, :description, :initdate, :enddate

  validates_attachment_content_type :logo, :content_type => /\Aimage\/.*\Z/

  def self.validateDates trip, newLocation
    trip.locations.where(initdate: (newLocation.initdate..newLocation.enddate)) + trip.locations.where(enddate: (newLocation.initdate..newLocation.enddate))
  end
end
