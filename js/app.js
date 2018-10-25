/**
 * You must include the dependency on 'ngMaterial'
 */
angular.module('MyApp', ['ngMaterial', 'ngMessages', 'ngRoute'])
    .controller('productsController', function productsController($scope, $http, $templateCache, $routeParams){
            $scope.searchValueFromField = localStorage.getItem('value');
            var searchField = angular.element(document.querySelector('.search-field'));

            // searchField.on('input', function(e){
            //     $scope.searchValueFromField = searchField.val() || ''; *

            // });
            localStorage.setItem('value',$scope.searchValueFromField);
            
            $scope.renderBox = angular.element(document.querySelector('.item-box'));

            $scope.$on('$routeChangeStart', function(event, next, current) {
                $scope.searchValueFromField = searchField.val() || '';

                if (typeof(current) !== 'undefined') {
                 $templateCache.remove(next.templateUrl);
             }
        $scope.$on('$$routeUpdate', function(){
        });

        $scope.$on("$routeChangeSuccess", function () {

            var category = $routeParams["category"];
            var searchWord = $routeParams['searchWord'];
            searchField.val($routeParams.searchWord);

            $http({method: 'GET', url: 'products.json', params: {category: category,
                    searchWord: searchWord}}).
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
                    }if(category !== undefined  || searchWord !== undefined){

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
        .when(`/prods/:category/:searchWord`,
            {
                templateUrl: 'js/view/productsView.html',
                controller: 'productsController',
            });



    $routeProvider.otherwise({redirectTo: '/'});

});
