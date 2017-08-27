/**
 * Here is a service that can be called by any controller in our application 'app'.
 * 
 * This service is only used for one thing, and that is to send a http post request
 * to a route specified on our server and to return the promise back to the caller.
 */
angular.module('app')
  .service('wiki-service', ['$http', function($http){
      //Our search endpoint
      var SEARCH_ENDPOINT = '/wiki/search';
      //The search function exposed for controllers to use
      this.search = function(term){
        //Data for post request
        var data = {
          term : term
        };
        //Options which include header information
        var options = {
          json : true
        };
        //The post request
        return $http.post(SEARCH_ENDPOINT, data, options);
      };
    
  }]);