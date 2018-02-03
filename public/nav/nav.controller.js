/**
 * Our nav controller. I made this to help move between pages easily.
 * 
 * This holds the functionality of the html, holding 'goTo' function that is
 * called in the 'ng-click' of each of the buttons. Based on the parameter given,
 * I can change the page in the 'ng-view' tag by using the native $location service
 * given by angular, which will allow us to change the path/route to the ones
 * we specify below (which are defined in our app.js file as routes)
 */
angular.module('app')
  .controller('navController', ['$scope','$location', function($scope, $location){
    /**
     * Even though in the html we called this function by just doing 'goTo()',
     * we need to add it the '$scope' variable that will allow our html to actually
     * see the variable.
     */
      $scope.goTo = function(path){
        switch(path){
          case 'Home':
            $location.path('/');
            break;
            case 'Wiki':
                $location.path('/wiki');
                break;
            case 'Bitcoinsearch':
                $location.path('/bitcoinsearch');
        }
      };
    
  }])
  /**
   * A directive basically allows you to make custom html tags (in this case this one would be <nav-bar>).
   * 
   * In the return we specify what html code should replace the tag when our code is rendered on the webbrowser,
   * and which controller should handle the functionality
   */
  .directive('navBar', function(){
    return {
        templateUrl: 'public/nav/nav.html',
        controller: 'navController'
    };
  });