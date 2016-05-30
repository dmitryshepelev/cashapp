(function (angular) {
    
    function SupplierCtrl ($scope, $rootScope, $q, $ToastrService, $CommonService, $SupplierService) {
        $scope.recentSuppliers = [];
        $scope.supplierQuery = '';
        $scope.suppliers = null;

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Init $scope with default values
         */
        function initScope(data) {

            /**
             * Init recent suppliers
             * @param suppliers
             */
            function initRecentSuppliers(suppliers) {
                $scope.recentSuppliers = suppliers;
            }

            /**
             * Init suppliers with default
             */
            function initSuppliers() {
                $scope.suppliers = null;
            }
            
            initRecentSuppliers(data[0].data.supplier);

            $rootScope.$on('Supplier.addSuccess', function (event, supplier) {
                $scope.recentSuppliers.push(supplier);
            });

            $rootScope.$on('Supplier.editSuccess', function (event, supplier) {
                var index = $CommonService.getIndexByField($scope.recentSuppliers, supplier.guid);
                if (index >= 0) {
                    $scope.recentSuppliers[index] = supplier;
                }
            });

            /**
             * Callback to execute on search success
             */
            function onSearchSuccess(response) {
                $scope.suppliers = response.data.instances;
            }

            $scope.$watch(function () {
                return $scope.supplierQuery;
            }, function (value) {
                if (value) {
                    $SupplierService
                        .search(value, {})
                            .then(onSearchSuccess)
                            .catch(onError);
                } else {
                    initSuppliers();
                }
            })
        }

        /**
         * Loads initial data values
         */
        function loadInitialData() {
            $q
                .all([
                    $SupplierService.getAll({ count: 5 })
                ])
                .then(initScope)
                .catch(onError)
        }

        loadInitialData();
    }

    SupplierCtrl.$inject = ['$scope', '$rootScope', '$q', '$ToastrService', '$CommonService', '$SupplierService'];

    angular
        .module('CashAppMy')
        .controller('supplier-controller', SupplierCtrl)

})(angular);
