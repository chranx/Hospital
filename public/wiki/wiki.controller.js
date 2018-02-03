/**
 * This is our wiki controller that holds the logic for our wiki page.
 *
 * Here is where we use the wiki-service we made in common/services/wiki.service.js.
 * Since we added the service to our 'app' module, our controller will be able to use it
 * by only adding it as a parameter to the function, that's it!
 */
angular.module('app')
    .controller('wikiController', ['$scope', 'wiki-service', function($scope, wikiService){
        //Variables you will see used in our html
        $scope.search = 'Optum';
        $scope.requested = false;
        $scope.error = false;
        $scope.errorMessage = '';
        $scope.noResults = false;
        $scope.results = [];
        //The function to search for the term inside the text-box
        $scope.searchFor = function(){
            //Reset booleans to show error or result
            $scope.requested = false;
            $scope.error = false;
            $scope.noResults = false;
            //Performs call provider to us by the wiki service we made
            wikiService.search($scope.search)
                .then(function(response){
                    //We only show results if it was successful, else
                    //we show an error on the page.
                    if(response.data.status == 'SUCCESS') {
                        var result = JSON.parse(response.data.result);
                        if(result.query.searchinfo.totalhits == 0){
                            $scope.noResults = true;
                        } else {
                            $scope.results = result.query.search;
                            $scope.requested = true;
                        }
                    } else {
                        $scope.errorMessage = response.data.message;
                        $scope.error = true;
                    }
                },    function(error){
                    $scope.errorMessage = response.data.message;
                    $scope.error = true;
                })
        }
    }]);