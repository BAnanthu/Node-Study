var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    const { method, url } = req;
    const { headers } = req;
    console.log("method")
    console.log(method)
    console.log("url")
    console.log(url)
    console.log("headers")
    console.log(headers)
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response

  
}).listen(8081); //the server object listens on port 8080