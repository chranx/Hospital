/**
 * Here we have our route we made for our wikipedia search.
 * 
 * Since we are expecting json package, we make our route expect a POST request for our '/search' route.
 * 
 * Since we don't have the actual api call here, we need to import our api module for the wiki search into
 * this file to be able to use it.
 */
var express = require('express'),
    router = express.Router(),
    wikiSearch = require('../api/wiki');


router.post('/search', function(request, response){
  //To show the json we send to this route
  console.log(request.body);
  /**
   *   Performs the api call found in api/wiki.js
   *   
   *   Like with the request model, we want to do this asynchronously, so we give
   *   out api a callback function that will be triggered once the http request is done.
   *   
   *   Here, like in api/wiki.js, we check whether or not an error occured, and respond accordingly
   *   by sending a response with a success status or a error status.
   */
  wikiSearch.search(request.body.term, function(error, result){
    if(error){
      response.json({ status : 'ERROR', message : error, result : null });
    }  else {
      response.json({ status : 'SUCCESS', message : 'Got search results for ' + request.body.term, result : result });
    }
  });
  
});

module.exports = router;