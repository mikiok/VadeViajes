module ApplicationHelper
	def gravatar_for(user, opts = {})
		opts[:alt] = user.name
		if user.avatar_file_size != nil
			image_tag "#{user.avatar.url(:small)}",
							opts
		else
			image_tag "https://www.gravatar.com/avatar/0?d=mm&f=y&s=#{opts.delete(:size) { 40 }}",
							opts
		end
	end
end
