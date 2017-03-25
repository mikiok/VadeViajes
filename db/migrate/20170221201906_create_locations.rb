class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
    	t.references :trip, foreign_key: true
      t.string :name
      t.float :latitude
      t.float :longitude
      t.datetime :initdate
      t.datetime :enddate

      t.timestamps
    end
  end
end
