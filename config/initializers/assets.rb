# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( registrations/registrations.js )
Rails.application.config.assets.precompile += %w( static_pages/static_pages.js )
Rails.application.config.assets.precompile += %w( maps.js )
Rails.application.config.assets.precompile += %w( trips/trip.js )
Rails.application.config.assets.precompile += %w( navbar.js )
Rails.application.config.assets.precompile += %w( channels/rooms.js )
Rails.application.config.assets.precompile += %w( users/user.js )
Rails.application.config.assets.precompile += %w( users/show.js )

Rails.application.config.assets.precompile += %w( static_pages.css )
Rails.application.config.assets.precompile += %w( registrations.css )
Rails.application.config.assets.precompile += %w( users/users.css )
Rails.application.config.assets.precompile += %w( users/show.css )
Rails.application.config.assets.precompile += %w( navbar.css )
Rails.application.config.assets.precompile += %w( trips/trips.css )
Rails.application.config.assets.precompile += %w( trips/show.css )
Rails.application.config.assets.precompile += %w( locations/new_location.css )
