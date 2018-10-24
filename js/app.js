/**
 * You must include the dependency on 'ngMaterial'
 */
angular.module('MyApp', ['ngMaterial', 'ngMessages', 'ngRoute'])
    .controller('productsController', function productsController($scope, $http, $location, $templateCache, $routeParams){


     $scope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(next.templateUrl);
        }
        $scope.$on("$routeChangeSuccess", function () {
            var category = $routeParams["category"];
            var searchWord = $routeParams['searchWord'];
            $http({method: 'GET', url: 'products.json', params: {category: category,
                    searchWord: $scope.searchedValueFromField}}).
                then(function success(response) {
                $scope.data = response.data;

                (function getCategoryList(){
                    $scope.categoriesList = new Set();
                    $scope.products = $scope.data.products;
                    for(let elem of $scope.products){
                        $scope.categoriesList.add(elem.bsr_category);
                    }
                })();

                    if(category === undefined && searchWord == undefined){
                        $scope.items = $scope.data.products;
                    }if(category !== undefined  && searchWord !== undefined){
                        (function choseCurrentCategory(){
                            $scope.itemsList = [];
                            for(var key of $scope.products){
                                if(key.bsr_category == category){
                                    $scope.itemsList.push(key);
                                }
                            }
                        })();
                        $scope.items =  (category!= 'all')? $scope.itemsList : $scope.data.products;
                    }
                        $scope.catrs = [];
                        for(let elem of $scope.categoriesList){
                            $scope.catrs.push(elem);
                        }
                });
        });


    });
}


)
.config(function($routeProvider){
    $routeProvider

        .when('/',
            {
                templateUrl: 'js/view/productsView.html',
                controller: 'productsController',
            });
    $routeProvider
        .when(`/prods/:category/`,
            {
                templateUrl: 'js/view/productsView.html',
                controller: 'productsController',
            });
    $routeProvider
        .when(`/prods/:category/:searchWord`,
            {
                templateUrl: 'js/view/productsView.html',
                controller: 'productsController',
            });



    $routeProvider.otherwise({redirectTo: '/'});

});
