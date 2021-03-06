(function() {
  var messages, messages_to_bottom;

  $('.card').css('width', '100%').css('width', '-=17px');

  messages = $('#messages');

  if ($('#messages').length > 0) {
    messages_to_bottom = function() {
      return messages.scrollTop(messages.prop("scrollHeight"));
    };
    messages_to_bottom();
    App.global_chat = App.cable.subscriptions.create({
      channel: "TripsChannel",
      trip_id: messages.data('trip-id')
    }, {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {
        messages.append(data['message']);
        return messages_to_bottom();
      },
      send_message: function(message, trip_id) {
        return this.perform('send_message', {
          message: message,
          trip_id: trip_id
        });
      }
    });
    $('#new_message').submit(function(e) {
      var $this, textarea;
      $this = $(this);
      textarea = $this.find('#message_body');
      if ($.trim(textarea.val()).length > 1) {
        App.global_chat.send_message(textarea.val(), messages.data('trip-id'));
        textarea.val('');
      }
      e.preventDefault();
      return false;
    });
  }

}).call(this);
