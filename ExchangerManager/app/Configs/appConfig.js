(function () {
    angular.module('app.config', ["ngRoute"])
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true
            });
            $routeProvider.when("/list", {
                templateUrl: "/app/list.html"
            });

            $routeProvider.when("/add", {
                templateUrl: "/app/AddMovie.html"
            });
            $routeProvider.otherwise({
                templateUrl: "/app/list.html"
            });
        });
})();