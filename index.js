var app = require('express')();
var http = require('http').createServer(app);
var file2=require('./file2')

var io = require('socket.io')(http);


app.get('/log', function(req, res){
  res.send('<h1>Log Streaming Application</h1>');
  console.log("inside get")
  //res.sendfile('index.html');
});


function tailf(file_name,start,end){


}

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  socket.on( 'file_change', function( data ) {
    console.log(data.title,data.message);
    io.sockets.emit( 'show_notification', { 
      title: data.title, 
      message: data.message, 
      icon: data.icon, 
    });
  });
});
