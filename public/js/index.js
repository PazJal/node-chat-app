var socket = io();

    socket.on('connect' , function () {
      console.log('Connected to server.');
      
    });

    socket.on('disconnect' , function () {
      console.log('Disconnected from server.');
    });

    socket.on('newMessage' , function (msg) {
      console.log('New Message: ' , msg);
      var li = jQuery('<li></li>');
      li.text(`${msg.from}: ${msg.text}`);
      jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage' , function (msg) {
      var li = jQuery('<li></li>') ;
      var a = jQuery('<a target="_blank">My current </a>');

      li.text(`${msg.from}:`);
      a.attr('href' , msg.url);
      li.append(a);
      jQuery('#messages').append(li);
    });

    // socket.emit('createMessage' , {
    //   from: 'Frank',
    //   text: 'Hi Ho'
    // } , function (data) {
    //   console.log('Got it!' , data);
    // });

    jQuery('#message-form').on('submit' , function (e){
      e.preventDefault();
      socket.emit('createMessage' , {
        from: 'User',
        text: jQuery('[name=message]').val()
      },
      function () {

      });
    });

    var locationButton = jQuery('#send-location');
    locationButton.on('click' , function () {
      if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
      }
      navigator.geolocation.getCurrentPosition(function (postion) {
        console.log(postion);
        socket.emit('createLocationMessage' , {
          latitude: postion.coords.latitude,
          longitude: postion.coords.longitude
        })
      } , function () {
        alert('Unable to fetch location.');
      });
    });

