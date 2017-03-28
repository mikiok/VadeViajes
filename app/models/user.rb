class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :avatar, styles: {:medium => "300x300>", 
  		:small => "40x40>", :common => "60x60", :thumb => "100x100>", :big => "500x500>", :profile => "250x250>"}

  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many :trips, through: :trip_participations
  has_many :trip_participations, dependent: :destroy
  has_many :messages, dependent: :destroy


  def name
    firstname
  end
end
