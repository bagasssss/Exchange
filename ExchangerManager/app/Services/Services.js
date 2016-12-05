(function () {
    angular.module("app.services", [])
        .factory("dbServices", function ($http) {

            var getAllDataFromBD_path = "../api/exchange/get";
            var addNewOperation_path = "../api/exchange/add";
            var removeFromDB_path = "../api/exchange/remove";
            var updateOperation_path = "../api/exchange/update";

            return {
                getAllDataFromDb: function () {
                    return $http({
                        method: 'GET',
                        url: getAllDataFromBD_path
                    }).success(function (response) {
                        console.log('getAllDataFromDB in service - successfull');
                        //
                        console.log(response.data);
                        return response.data;
                    })
                },

                removeFromDB: function (id) {
                    isDeleteSuccess = false;
                    console.log('isDeleteSuccess ' + isDeleteSuccess);
                     return $http({
                        method: 'POST',
                        url: removeFromDB_path,
                        data: id
                    }).success(function () {
                        return true;
                        console.log("removeFromDB in services - success");
                    })
                },

                addOperation: function (exchange) {
                    console.log(exchange);
                    isAddingSuccess = false;
                     return $http({
                        method: 'POST',
                        url: addNewOperation_path,
                        data: exchange
                    }).success(function () {
                        return true;
                        console.log("addOperation in services - success");
                    })
                },

                updateOperation: function (exchange) {
                    isUpdateSuccess = false;
                     return $http({
                        method: 'POST',
                        url: updateOperation_path,
                        data: exchange
                    }).success(function () {
                        return true;
                        console.log("data was UPDATED in service success")
                    })
                }
            }
        })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $window) {
            return {
                request: function (config) {
                    
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