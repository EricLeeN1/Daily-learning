var http = require('http');

http.createServer(function (req,res) {
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World,use supervisor,listen</p>');
}).listen(3000);

console.log("HTTP server is listen at port 3000");