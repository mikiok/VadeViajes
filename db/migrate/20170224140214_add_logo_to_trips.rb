class AddLogoToTrips < ActiveRecord::Migration[5.0]
  def self.up
    add_attachment :trips, :logo
  end
  def self.down
    remove_attachment :trips, :logo
  end
end
