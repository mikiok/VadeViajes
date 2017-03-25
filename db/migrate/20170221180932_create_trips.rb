class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.string :name
      t.string :description
      t.datetime :initdate
      t.datetime :enddate

      t.timestamps
    end
  end
end
