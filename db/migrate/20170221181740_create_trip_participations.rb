class CreateTripParticipations < ActiveRecord::Migration[5.0]
  def change
    create_table :trip_participations do |t|
      t.references :user, foreign_key: true
      t.references :trip, foreign_key: true 
      t.string :role

      t.timestamps
    end
  end
end
