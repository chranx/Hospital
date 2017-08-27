/**
 * This is initlializing our angular app, here we do 'angular.module(<name>, [])'. You only want to have the second
 * argument (the []) when you first initlize the module. In all other cases you call 'angular.module', you only want
 * to do 'angular.module(<name>)'. This is becuase if you call the angular.module function with two functions, you will
 * be creating a new instance of that in every controller/directive file you create, which will mess everything up
 * as nothing is actually connected. I hope this made sense.
 */
angular.module('app',['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    /**
     * This call makes our routes html5 compliant. If we did not use this our urls would look like :
     *
     * www.google.com/#/home
     *
     * which we don't want, with this enabled, we get
     *
     * www.google.com/home
     */
    $locationProvider
      .html5Mode(true);

    /**
     * This is our routes configuration for our angular application.
     *
     * Route '/' : This is our root/main directly (i.e. www.google.com/)
     *  This will load the home page in the ng-view tag in our index.html file when we go to the
     *  root/main directory.
     *
     * Route '/wiki' : This is our second route we are going to see in our demo. (i.e. www.google.com/wiki)
     *  This will go to an 'wiki' page that will load the wiki html page in the ng-view in place of
     *  where the home page was previously on the screen.
     *  
     * Route 'otherwise' : This is our wildcard route, if the path does not fit any of the pre-defined routes, it
     *  will just redirect the page to the '/' route, which goes to our home page. 
     */
    $routeProvider
      .when('/',{
        templateUrl : 'public/home/home.html',
        controller : 'homeController'
      })
      .when('/wiki',{
        templateUrl : 'public/wiki/wiki.html',
        controller : 'wikiController'
      })
      .otherwise({
        redirectTo : '/'
      });

  }]);
