(function () {
    angular.module("app.controllers", ["app.services"])
        .controller("dataController", function ( dbServices) {
            var vm = this;

            vm.list;
            activate();

            function activate() {
                getDataFromDb();
            };

            
            function getDataFromDb() {
                dbServices.getAllDataFromDb().success(function (data) {
                    vm.list = data;
                    console.log('list in controller');
                    console.log(data);
                }); 
            };

            vm.removeOperation = function (id) {
                if (confirm("Are you shure?")) {
                    console.log('status de: ' + dbServices.returnIsDeleteSuccess());
                    var deletePromise = dbServices.removeFromDB(id);

                    deletePromise.success(function (result) {
                        for (var i = 0; i < vm.list.length; i++) {
                            console.log('del from controller list...');
                            if (vm.list[i].Id === id) {
                                vm.list.splice(i, 1);
                                console.log('del from controller list...complete');
                                break;
                            }
                        };
                    })

                };
             };

                vm.addOperation = function (operation) {
                    dbServices.addOperation(operation).success(function (result) {
                        vm.list.push(operation);
                        console.log("ADD Operation in CONTROLLER - SUCCESS")
                    })
                };


                vm.startEditOperation = function (orderId) {
                    for (var i = 0; i < vm.list.length; i++) {
                        if (vm.list[i].Id === orderId) {
                            //console.log(vm.list[i].IsEditMode);
                            vm.list[i].IsEditMode = true;
                            //console.log('editOperation for ' + orderId + ' was success');
                            //console.log(vm.list[i].IsEditMode);
                            break;
                        };
                    };
                };

                vm.cancelEditOperation = function (orderId) {
                    for (var i = 0; i < vm.list.length; i++) {
                        if (vm.list[i].Id === orderId) {
                            //console.log(vm.list[i].IsEditMode);
                            vm.list[i].IsEditMode = false;
                            //console.log('canselEditing for ' + orderId + ' was success');
                            //console.log(vm.list[i].IsEditMode);
                            break;
                        };
                    };
                };

                vm.editOrder = function (oldOperationId, newOperation) {

                    var editedOperation = newOperation;
                    console.log(oldOperationId);
                    editedOperation.Id = oldOperationId;
                    //editedOperation.InputAmount = newOperation.InputAmount;
                    //editedOperation.InputCurrency = newOperation.InputCurrency;
                    //editedOperation.OutputAmount = newOperation.OutputAmount;
                    //editedOperation.OutputCurrency = newOperation.OutputCurrency;
                    editedOperation.IsEditMode = false;

                    for (var i = 0; i < vm.list.length; i++) {
                        if (vm.list[i].Id === oldOperationId) {
                            editedOperation.DateTime = vm.list[i].DateTime;
                            break;
                        };
                    };

                    dbServices.updateOperation(editedOperation).success(function (result) {
                        for (var i = 0; i < vm.list.length; i++) {
                            if (vm.list[i].Id === oldOperationId) {
                                vm.list[i].InputAmount = newOperation.InputAmount;
                                vm.list[i].InputCurrency = newOperation.InputCurrency;
                                vm.list[i].OutputAmount = newOperation.OutputAmount;
                                vm.list[i].OutputCurrency = newOperation.OutputCurrency;
                                
                                console.log("editing list in controller - success");
                                vm.list[i].IsEditMode = false;
                                break;
                            };
                        };
                    });
                };


                //
                //changing filtering
                //
                vm.filterType = 'InputAmount';
                vm.changeFilterType = function (newFilter) {
                    console.log('filter changing...'+'  old type is -- '+vm.filterType);
                
                    if (vm.filterType === newFilter) {
                        vm.filterType = "-" + vm.filterType;
                    } else {
                        vm.filterType = newFilter;
                    }
                    console.log('the new filtertype is -- ' + vm.filterType);
                };



            })

})();