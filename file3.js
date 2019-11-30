var fs = require('fs')
//  var t = require('./file2.js')
//  t('input',1024,function(err,data){ console.log(data+'')})
//
module.exports = function(file,lastNBytes,cb){
  var fd, size, called;
  var orig = cb
  //next=1
   var next=function abc(){
    steps.shift(1);}

  var start = function fn(err,data){
    if(steps.length && !err) {
      return steps.shift(next)
    }
    console.log('here')
    if(called) return;
    called = 1
    orig(err,data)
    if(fd) fs.close(fd,function(){})
  }
  
  var steps = [
    // first open the file
    function(next){
      fs.open(file,'r',function(err,_fd){
        if(err) return cb(err)
        fd = _fd
        next()
      })
    },
    // then stat the file to get the size
    function(next){
      fs.stat(file,function(err,stat){
        if(err) return cb(err)
        size = stat.size
        next()
      })
    },
    // read the file offset you want and close the file
    function (next){
      fs.read(fd, new Buffer(lastNBytes), size-lastNBytes, lastNBytes, 0, function(err,bytesRead,data){
        if(err) return next(err)
        next(false,data.slice(0,bytesRead))
      })
    }
  ]
 
  start();
}



 
//  var t = require('./file2.js')
//  t('my_log.txt',1024,function(err,data){ console.log(data+'')})
//