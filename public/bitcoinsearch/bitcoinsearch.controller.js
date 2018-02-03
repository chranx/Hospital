/**
 * This is our wiki controller that holds the logic for our wiki page.
 *
 * Here is where we use the wiki-service we made in common/services/wiki.service.js.
 * Since we added the service to our 'app' module, our controller will be able to use it
 * by only adding it as a parameter to the function, that's it!
 */
angular.module('app')
    .controller('bitcoinsearchController', ['$scope', function($scope){

        $scope.search = "bitcoin";
        $scope.clickedSearch = "";


        var mapOfBitcoinPrices = {
            "BTC" : "9000",
            "LTC" : "652",
            "ETH" : "1210"
        }

        $scope.searchFor = function() {

            var bitcoinIndex = $scope.search;

            if(mapOfBitcoinPrices.hasOwnProperty(bitcoinIndex)) {
                var bitcoinValue = mapOfBitcoinPrices[bitcoinIndex];
            } else {
                var bitcoinValue = "NOT AN INDEX";
            }




            $scope.clickedSearch = bitcoinValue;
        }
    }]);