/**
 * All of these are node.js modules we use to setup our server
 */
var http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    wikiRoute = require('./routes/wiki');

/**
 * Creates an instance of express to setup API routes and creates
 * our http server based on that instance.
 */
var app = express(),
    server = http.createServer(app);

/**
 * These are paths that we create to get access to specific locations from the client/web-browser.
 * 
 * That means if you want to access say, the index.html file, we set up our route so that the 
 * '/public' route (i.e. www.google.com/public) will be a route to our own /public folder in this project.
 * 
 * So if the webpage requested www.google.com/public/index.html, it is actually getting the ./public/index.html
 * file that is located in our project directly. 
 */
app.use('/modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/public', express.static(path.join(__dirname, '/public')));
/**
 * When sending data to our server, the json that is sent in the post request
 * will just be raw bytes (or something annoying for us to parse by ourselves).
 *
 * In express this is called a 'middleware' function, as in, a function that is
 * called before the request finally gets to our route.
 *
 * This middleware 'body-parser', does the hard work for us when we send json to our server,
 * as it will parse the raw data for us, and put the json into the 'body' variable of our
 * request parameter. (Accessed by doing request.body)
 */
app.use(bodyParser.json());
/**
 * This is simlar to the '/modules' and '/public' routes we made above, except this will
 * go to a specific api we made for our application. Above we set the wikiRoute to import the
 * wiki module from routes/wiki.js. In routes/wiki.js, we setup a route called '/search' to call the
 * wikipedia api for us. By setting '/wiki' as the path to use the routes from routes/wiki.js, to call our
 * '/search' route within that file, we can use '/wiki/search' to get access to our api from our angular app. 
 */
app.use('/wiki', wikiRoute);
/**
 * This route will be called when you go to the main page of the webpage;
 * 
 * example: www.google.com would go to this route
 * 
 */
app.get('/', function(request, response){
  response.sendFile(path.resolve('./public/index.html'));
});

/**
 * This route is a wildcard route, if the route the user requested is not any
 * of our pre-defined routes, this will be called instead and will just send
 * the user to the main page.
 */
app.get('*', function(request, response){
  response.sendFile(path.resolve('./public/index.html'));
});

/**
 * Runs the server on port 8080
 */
server.listen(8080, '0.0.0.0', 511, function () {
  console.log('Angular http server is running on port 8080');
});