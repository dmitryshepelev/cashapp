(function (angular) {

    function POCtrl ($scope, $rootScope, $q, $CommonService, $POService, $CurrencyService, $ToastrService, $state) {
        $scope.currencies = [];

        $scope.pos = {
            data: null,
            manage: _managePOModal,
            getIndexByGuid: _getIndexByGuid,
            details: _goToDetails
        };

        /**
         * Go to details
         * @private
         */
        function _goToDetails($event, guid) {
            $event.stopImmediatePropagation();
            if (!guid) {
                $ToastrService.error();
            } else {
                $state.go('my.po.details', {guid: guid});
            }
        }

        /**
         * Opens manage PO modal
         * @private
         */
        function _managePOModal($event, guid) {
            $event.stopImmediatePropagation();
            if (!guid) {
                $ToastrService.error();
            } else {
                $state.go('my.po.action', { action: 'edit', guid: guid });
            }
        }

        /**
         * Get PO index in pos by guid
         * @private
         */
        function _getIndexByGuid(guid) {
            return $CommonService.getIndexByField($scope.pos.data, guid);
        }

        /**
         * Error callback
         * @param response
         */
        function onError (response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Function to init $scope
         */
        function initScope (data) {
            /**
             * Init $scope.currencies
             * @param currencies
             */
            function initCurrencies(currencies) {
                $scope.currencies = currencies;
            }
            
            /**
             * init $scope.pos
             * @param pos
             */
            function initPOsModel(pos) {
                $scope.pos.data = pos;
            }

            data.forEach(function (item) {
                if (item.data.hasOwnProperty('currencies')) {
                    initCurrencies(item.data.currencies)
                } else if (item.data.hasOwnProperty('po')) {
                    initPOsModel(item.data.po)
                }
            });

            $rootScope.$on('PO.addSuccess', function (event, newPO) {
                if (!Array.isArray($scope.pos.data)) {
                    $scope.pos.data = [];
                }
                $scope.pos.data.push(newPO);
            });
            
            $rootScope.$on('PO.editSuccess', function (event, editedPO) {
                var index = $scope.pos.getIndexByGuid(editedPO.guid);
                if (index >= 0) {
                    $scope.pos.data[index] = editedPO;
                } else {
                    throw new Error('Invalid instance was edited');
                }
            })
        }

        function loadInitialData () {
            $q
                .all([
                    $CurrencyService.getAll(),
                    $POService.getAll()
                ])
                .then(initScope)
                .catch(onError);
        }

        loadInitialData();
    }

    POCtrl.$inject = ['$scope', '$rootScope', '$q', '$CommonService', '$POService', '$CurrencyService', '$ToastrService', '$state'];

    angular
        .module('CashAppMy')
        .controller('po-controller', POCtrl)

})(angular);