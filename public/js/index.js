var socket = io();

    socket.on('connect' , function () {
      console.log('Connected to server.');
      
    });

    socket.on('disconnect' , function () {
      console.log('Disconnected from server.');
    });

    socket.on('newMessage' , function (msg) {
      var formattedTime = moment(msg.createdAt).format('h:mm a');
      var template = jQuery('#message-template').html();
      var html = Mustache.render(template , {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
      });
      jQuery('#messages').append(html);

      
      // console.log('New Message: ' , msg);
      // var li = jQuery('<li></li>');
      // li.text(`${formattedTime} ${msg.from}: ${msg.text}`);
      // jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage' , function (msg) {

      var formattedTime = moment(msg.createdAt).format('h:mm a');
      var template = jQuery('#location-message-template').html();
      var html = Mustache.render(template , {
        from: msg.from,
        createdAt: formattedTime,
        url: msg.url
      });
      jQuery('#messages').append(html);
      // var li = jQuery('<li></li>') ;
      // var a = jQuery('<a target="_blank">My current </a>');

      // li.text(`${formattedTime} ${msg.from}:`);
      // a.attr('href' , msg.url);
      // li.append(a);
      // jQuery('#messages').append(li);
    });

    // socket.emit('createMessage' , {
    //   from: 'Frank',
    //   text: 'Hi Ho'
    // } , function (data) {
    //   console.log('Got it!' , data);
    // });

    jQuery('#message-form').on('submit' , function (e){
      e.preventDefault();
      var messageTextbox = jQuery('[name=message]');
      socket.emit('createMessage' , {
        from: 'User',
        text: messageTextbox.val()
      },
      function () {
        messageTextbox.val('');
      });
    });

    var locationButton = jQuery('#send-location');
    locationButton.on('click' , function () {
      if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
      }

      locationButton.attr('disabled' , 'disabled').text('Sending Location...');
      navigator.geolocation.getCurrentPosition(function (postion) {
        console.log(postion);
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage' , {
          latitude: postion.coords.latitude,
          longitude: postion.coords.longitude
        })
      } , function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
      });
    });

