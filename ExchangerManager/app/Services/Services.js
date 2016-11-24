(function () {
    angular.module("app.services", [])
        .factory("dbServices", function ($http) {

            var getAllDataFromBD_path = "../api/exchange/get";
            var addNewOperation_path = "../api/exchange/add";
            var removeFromDB_path = "../api/movie/delete";
            var updateOperation_path = "../api/movie/update";

            var isDeleteSuccess = false;
            var isAddingSuccess = false;
            var isUpdateSuccess = false;


            return {
                returnIsDeleteSuccess: function () {
                    return isDeleteSuccess;
                },

                returnIsAddingSuccess: function () {
                    return isAddingSuccess;
                },

                returnIsUpdateSuccess: function() {
                    return isUpdateSuccess;
                },

                getAllDataFromDb: function () {
                    return $http({
                        method: 'GET',
                        url: getAllDataFromBD_path
                    }).success(function (response) {
                        console.log('successfull');
                        console.log(response);
                        return response;
                    })
                },

                removeFromDB: function (id) {
                    movieDeleting = false;
                    $http({
                        method: 'POST',
                        url: removeFromDB_path,
                        data: id
                    }).success(function () {
                        console.log("operation " + id + " was deleted from DB");
                        movieDeleting = true;
                    })
                },

                addOperation: function (exchange) {
                    isAddingSuccess = false;
                    $http({
                        method: 'POST',
                        url: addNewOperation_path,
                        data: exchange
                    }).success(function () {
                        console.log("operation " + exchange + " was added succesfully")
                        isAddingSuccess = true;
                    })
                },

                updateOperation: function (exchange) {
                    isUpdateSuccess = false;
                    $http({
                        method: 'POST',
                        url: updateOperation_path,
                        data: exchange
                    }).success(function () {
                        console.log("operation was updated successfully");
                        isUpdateSuccess = true;
                    })
                }
            }
        })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $window) {
            return {
                request: function (config) {
                    //config.header =  { 'accessKey' : 'testKEY' };
                    config.headers['accessKey'] = 'testKEY';
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