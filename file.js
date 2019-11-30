var fs = require('fs');

module.exports = function(inputFile, onEnd){
    var sLength = 1024;
    var buffer = new Buffer(sLength);
    var _lineFragment = '';
    var fd = fs.openSync("my_log.txt", 'r');

    var position = 0;
    var i = 0;  

    var block_queue = [];
    var block_fetching = false;

    var fetchBlock = function (callback){
        if(!callback){
            console.warn('no callback when call fetchBlock()')
        };
        
        if(!block_fetching){
            block_fetching = true;
        }else{
            block_queue.push(callback);
            return;
        }
        
        console.log('read postion: ', position);

        fs.read(fd, buffer, 0, sLength, position, function(err, bytesRead, buf){
            if(err) throw err;

            if(bytesRead === 0){
                onEnd(0, i);  
                return;
            }
            position += bytesRead;

            var lines = buf.toString('utf8', 0, bytesRead).split(/(?:\n|\r\n|\r)/g);

            lines[0] = _lineFragment + lines[0];
            _lineFragment = lines.pop() || '';

            block_fetching = false;
            if(callback){
                try{
                    callback(lines, i);
                }catch(e){
                    throw e;
                }
                i += lines.length;

                if(block_queue.length){
                    fetchBlock( block_queue.shift() );
                }
                return;
            }
        });
    };
    
    return fetchBlock;
};


 