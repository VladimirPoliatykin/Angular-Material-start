/**
 * You must include the dependency on 'ngMaterial'
 */
var myApp = angular.module('MyApp', ['ngMaterial', 'ngMessages', 'ngRoute']);
myApp.controller('productsController', function productsController($scope, $http, $location, $templateCache, $routeParams){

    $scope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(next.templateUrl);
        }
        $scope.$on("$routeChangeSuccess", function () {

            var category = $routeParams["category"];

            if(category!=='undefined'){

                $http({method: 'GET', url: 'products.json', params: {category: category}}).
                then(function success(response) {
                    $scope.data = response.data;
                    $scope.items = $scope.data;
                    console.log(category);
                    $scope.categoriesList = new Set();
                    $scope.products = $scope.items.products;
                    for(let elem of $scope.products){
                        $scope.categoriesList.add(elem.bsr_category);
                    }
                   $scope.itemsList = [];
                    for(let key of $scope.items.products){
                        if(key.bsr_category == category){
                            $scope.itemsList.push(key);
                        }
                    }
                    $scope.items =  (category!= 'all')? $scope.itemsList : $scope.data.products;

                    $scope.catrs = [];
                    for(let elem of $scope.categoriesList){
                        $scope.catrs.push(elem);
                    }
                });

                angular.element(document).ready(function () {
                    $scope.categoriesListItems = angular.element(document.querySelectorAll('.categories-link-item'));
                    $scope.renderedItems = angular.element(document.querySelectorAll('.item-box'));
                    $scope.productsWrapper = angular.element(document.querySelector('.products'));

                    $scope.categoriesSetofArrays = new Set();
                    // $scope.categoriesListItems[0].onclick =  function(e){  ///Show all products when press 'All categories'
                    //
                    //     for(var i = 0; i < $scope.renderedItems.length; i++){
                    //
                    //         $scope.productsWrapper.append($scope.renderedItems[i]);
                    //     }
                    //
                    // };



                });

            }
        });


    });
}


);
myApp.config(function($routeProvider){
    $routeProvider

        .when('/',
            {
                templateUrl: 'js/view/productsView.html',
                controller: 'productsController',
            });
    $routeProvider
        .when(`/prods/:category`,
            {
                templateUrl: 'js/view/productsView.html',
                controller: 'productsController',
            });



    $routeProvider.otherwise({redirectTo: '/'});

});
