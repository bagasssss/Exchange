(function () {
    angular.module("app.services", [])
        .factory("dbServices", function ($http) {

            var getAllMoviesFromDB_path = "../api/movie/getAll";
            var getMovieFromDBByTitle_path = "../api/movie/searchByTitle";
            var addNewMovie_path = "../api/movie/add";
            var removeMovieFromDBByTitle_path = "../api/movie/delete";
            var isDeleteSuccess = false;
            var isAddingSuccess = false;


            return {
                returnIsDeleteSuccess: function () {
                    return isDeleteSuccess;
                },

                returnIsAddingSuccess: function () {
                    return isAddingSuccess;
                },

                getAllMovies: function () {
                    return $http({
                        method: 'GET',
                        url: getAllMoviesFromDB_path
                    }).success(function (response) {
                        console.log(response);
                        console.log(response.movies);
                        return response;
                    })
                },

                getMovieByTitle: function (title) {
                    return $http({
                        method: 'GET',
                        url: getMovieFromDBByTitle_path,
                        data: title
                    }).success(function (response) {
                        console.log(response);
                        return response;
                    })
                },

                deleteMovieByTitle: function (title) {
                    movieDeleting = false;
                    $http({
                        method: 'POST',
                        url: removeMovieFromDBByTitle_path,
                        data: title
                    }).success(function () {
                        console.log("product " + title.title + " was deleted from DB");
                        movieDeleting = true;
                    })
                },

                addNewFilm: function (film) {
                    isAddingSuccess = false;
                    $http({
                        method: 'POST',
                        url: addNewMovie_path,
                        data: film
                    }).success(function () {
                        console.log("product " + film + " was added succesfully")
                        isAddingSuccess = true;
                    })
                }
            }
        })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $window) {
            return {
                request: function (config) {
                    config.header =  { 'MovieApp' : '12345' };
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401 || response.status === 404) {
                        $window.alert("Error: " + response.status);
                    }
                    return $q.reject(response);
                }
            }
        })
    })


 })();