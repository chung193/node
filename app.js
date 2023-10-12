var http = require('http');
http.createServer((request, response)=>{
response.writeHead(200, {'Content-Type': 'text/html'});
var param = request.url;
response.write(param);
response.write("Hello world");
response.end();
}).listen(8000);
console.log("hello world");