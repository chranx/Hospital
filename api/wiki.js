/**
 * Request is a basic http client we can use to do http requests (GET, POST, ...)
 * Query-String takes JSON objects and turns them into HTTP query strings such as ?a=b&c=d
 * 
 * In this module we are going to be just doing http GET requests to get results from the wikipedia API
 *
 */
var request = require('request'),
    querystring = require('query-string'),
    mergeArray = require('merge-array');

//The url for the wiki api.
var url = 'https://en.wikipedia.org/w/api.php';

/**
 * Our function to use the wikipedia api to search for
 * articles using our term.
 *
 * We will be using the following API:
 * https://www.mediawiki.org/wiki/API:Search
 * 
 * @param term The term we are searching for
 * @param callback (error, result)
 */
var search = function(term, callback){
  //The query paramters for our call
  var query = {
    action : 'query',
    list : 'search',
    srsearch : term,
    srlimit : '10',
    utf8 : '',
    format : 'json'
  };
  //Creates the url with the query string
  var query_url = url + '?' + querystring.stringify(query);
  //Outputs the url for debugging
  console.log(query_url);
  /**
   * Does an http GET request using our url, with the second parameter being a callback
   * 
   * Callbacks are used because in node basically everything is done asynchronously, so we don't
   * know how long our http request might take. To not make our server just wait until the call
   * is done, we give this function a callback that has 3 parameters:
   * 
   *    error : If no error occurs, this will be null, otherwise it will indicate the error
   *    response : The full response object from the request, only really use it to get header and status info
   *    body : The actual data we requested, usually in a json format.
   *
   * This allows our server to move on to other processes, and deal with the response later.
   */
  request.get(query_url, function(error, response, body){
    /**
     * When doing http request, you always want to make sure that the error parameter is not-null, and that
     * the http response status is 200. If neither are the case, then we should consider this as an error,
     * and return to the caller that an error occured. I use the same callback methodilgy when making
     * this search api call (except with only two parameters, error and result). So if there is an error with
     * this http call, I set the first parameter of the callback to a non-null value (here a string), and the result null to indicate
     * something went wrong. If everything went well, I make the first param null, and give the result as the second param.
     */
    if(error || response.statusCode != 200){
      console.log(error);
      callback('There was an error getting your results', null);
    } else {
      console.log(body);
      var result = JSON.parse(body);
      if(result.error != undefined){
        callback(result.error.info, null)
      } else {
        callback(null, body);
      }
    }
  });
};

module.exports.search = search;