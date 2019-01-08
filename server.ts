var express = require("express");

const port = 8080;

const http = express();

http.get('/', (request:any, response:any) => {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World 2\n');
})

http.listen(port);

// Console will print the message
console.log(`Server running at http://127.0.0.1:${port}/`);