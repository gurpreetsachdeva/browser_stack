var http = require('http');

var fs = require('fs');
var last_10_lines=""
 
fs.readFile('input_log.text', 'utf8', function(err, contents) {
    //last_10_lines=contents;
    console.log(contents);
});
 
console.log('after calling readFile');

function tail_function(file_name,start,end)
{

}
//create a server object:
http.createServer(function (req, res) {
  res.write("Log Streaming Application\n");
  //console.log(contents)
  //res.write(String(last_10_lines)); //write a response to the client
  res.end(); //end the response


}).listen(8080); //the server object listens on port 8080


