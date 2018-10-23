/**
 * You must include the dependency on 'ngMaterial'
 */
var myApp = angular.module('MyApp', ['ngMaterial', 'ngMessages']);
myApp.controller('productsController',
    function($scope, $http){

        $http({method: 'GET', url: 'products.json'}).
        then(function success(response) {
            $scope.items = response.data;
            $scope.categoriesList = new Set();
            $scope.products = $scope.items.products;

            for(let elem of $scope.products){
                $scope.categoriesList.add(elem.bsr_category);
            }

            $scope.catrs = [];
            for(let elem of $scope.categoriesList){
                $scope.catrs.push(elem);

            }
















        });

        angular.element(document).ready(function () {


            // Your document is ready, place your code here
            // $scope.products = angular.element(document.querySelector('.products-container'));
            // $scope.categories = angular.element(document.querySelector('.categories'));
            // $scope.productsWidth = $scope.products[0].offsetTop;
            // $scope.categories.css('top',  $scope.productsWidth);




            $scope.categoriesListItems = angular.element(document.querySelectorAll('.categories-item'));
            $scope.renderedItems = angular.element(document.querySelectorAll('.item-box'));

            $scope.productsWrapper = angular.element(document.querySelector('.products'));
            console.log($scope.productsWrapper);
            $scope.categoriesListItems[0].onclick =  function(e){
                for(var i = 0; i < $scope.renderedItems.length; i++){

                        $scope.productsWrapper.append($scope.renderedItems[i]);

                };
            };
            for(var i = 1 ; i < $scope.categoriesListItems.length; i++){
                $scope.categoriesListItems[i].onclick = function(e){

                    $scope.categorySetItems = [];

                    for(var i = 0; i < $scope.renderedItems.length; i++){
                        if($scope.renderedItems[i].dataset.category == this.dataset.category){
                            $scope.categorySetItems.push($scope.renderedItems[i]);
                        }
                            $scope.renderedItems[i].remove();

                    }

                    for(let i = 0 ; i < $scope.categorySetItems.length; i++){
                        $scope.productsWrapper.append($scope.categorySetItems[i]);
                    }





                };
            };

        });




    }

);
