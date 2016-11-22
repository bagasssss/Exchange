(function () {
    angular.module("app.controllers", ["app.services"])
        .controller("dataController", function ($scope, dbServices) {

            $scope.list;
            getAllMovies();
            function getAllMovies() {   
                dbServices.getAllMovies().success(function (data) {
                    $scope.list = data;
                })
                console.log($scope.list);
            };


            $scope.deleteMovie = function (film) {
                if (confirm("Are you shure?")) {
                    dbServices.deleteMovieByTitle(film)
                    if (dbServices.returnIsDeleteSuccess) {
                            for (var i = 0; i < $scope.list.movies.length; i++) {
                                if ($scope.list.movies[i].title == film.title) {
                                    $scope.list.movies.splice(i, 1);
                                    break;
                                }
                            }
                    }
                }
            };

            $scope.addNewFilm = function(newProduct) {
                dbServices.addNewFilm(newProduct);
                if (dbServices.returnIsAddingSuccess) {
                    $scope.list.movies.push(newProduct);
                }
            };

            $scope.movieByTitle;
            $scope.getMovieByTitle = function(FilmByTitle) {
                dbServices.getMovieByTitle(FilmByTitle).success(function (data) {
                    $scope.deleteMovie = data;
                    $scope.errorDissable = false;
                }).error(function () {
                    $scope.textForError = FilmByTitle;
                    $scope.errorDissable = true;
                });
            };

            $scope.filterType = null;
            $scope.changeFilterType = function (filterTypeFromClick) {
                console.log("change filter to " + filterTypeFromClick);
                if ($scope.filterType === filterTypeFromClick) {
                    $scope.filterType = "-" + $scope.filterType;
                } else {
                    $scope.filterType = filterTypeFromClick;
                }
            };

            $scope.errorDissable = false;
            $scope.textForError;

            $scope.closeSearch = function () {
                $scope.errorDissable = false;
            }
        })

})();