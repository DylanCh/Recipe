var http = require('http');
//var events = require('events');
const PORT = 8000;
const express    =    require('express');
var unirest = require('unirest');
// var fs = require('fs'),
//     path = require('path'),    
//     filePath = path.join(__dirname, './index.html');
// fs.readFile(filePath, function (err, html) {
//   if (err) throw err;
//   try{
//     var server=http.createServer(function(request, response) {  
//           response.writeHeader(200, {"Content-Type": "text/html"});  
//           response.write(html);  
//           response.end();  
//       });
//       server.listen(8000);
//   }
//   catch(e){
//     console.log('Something is wrong');
//     return;
//   }
// });
var app = express();
var path = require("path");
var cons = require('consolidate');

app.set('port', (process.env.PORT || PORT));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');

// View engine set up
//app.set('view engine', 'ejs');
app.engine('html', cons.swig);

app.get('/', function(request, response) {
  //response.render('index');
  response.sendFile(
     //response.render(
        path.join(__dirname+'/views' + '/index.html'));
});

app.get('/rickroll/',function(request, response){
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('<!DOCTYPE "html">'); response.write('<html>'); response.write("<head>"); 
  response.write('<link href="https://s1.mdpcdn.com/web/css-min/recipecom/css/global_2cc36d25c74611649eb7f11c97c51f61.css" rel="stylesheet" type="text/css">');
  response.write("<title>You've been rick rolled</title>"); response.write("</head>"); 
  response.write("<body>");
  response.write(
    '<div><iframe width="1080" height="700" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe></div>'
  ); response.write("</body>"); response.write("</html>");
  response.end();
});

app.get('/login/',function(request, response){
  response.writeHead(200, {"Content-Type": "text/html"}); 
  response.write('<!DOCTYPE "html">'); response.write('<html>'); response.write("<head>"); 
  response.write('<link href="https://s1.mdpcdn.com/web/css-min/recipecom/css/global_2cc36d25c74611649eb7f11c97c51f61.css" rel="stylesheet" type="text/css">');
  response.write("<title>Hello World Page</title>"); response.write("</head>"); 
  
  response.write("<body>"); response.write("Hello World!"); response.write("</body>"); response.write("</html>"); response.end();
});


app.get('/search/',function(request, response){
    console.log(request.query.searchTerm);
    // response.writeHeader(200, {"Content-Type": "text/html"});
    // response.write(
    //   '<div><iframe width="560" height="315" src="https://www.youtube.com/embed/DCILKrYJp-0" frameborder="0" allowfullscreen></iframe></div>'); 
    
    unirest.get("https://community-food2fork.p.mashape.com/search?key=1eafd5c8a4e1799d7798323828be0c15&q="+request.query.searchTerm)
      .header("X-Mashape-Key", "97u4tLreu9mshr5fLYZrfAOA8pG4p19dqQJjsn88hWmM5tZyYr")
      .header("Accept", "application/json")
      .end(function (result) {
        console.log(result.body);
        // response.write('<div>'+result.body+'</div>');
        //response.json(result.body);
      });
    response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//console.log("Server running at http://localhost:"+PORT);