(function (angular) {

    function POCtrl ($scope, $q, $CommonService, $POService, $CurrencyService, $ToastrService, $state) {
        $scope.cardsModel = {};
        $scope.cashesModel = {};
        $scope.currencies = [];

        $scope.pos = {
            data: null,
            edit: _editPOModal,
            getPOIndexByGuid: _getPOIndexByGuid
        };

        $scope.$watch(function () {
            return $POService.tempPO();
        }, function (po) {
            if (Array.isArray($scope.pos.data)) {
                var index = $scope.pos.getPOIndexByGuid(po.guid);
                if (index >= 0) {
                    $scope.pos.data[index] = po;
                } else {
                    $scope.pos.data.push(po);
                }
            }
        });

        /**
         * PaymentObject prototype constructor
         * @constructor
         */
        function PO () {
            this.guid = '';
            this.currency = {};
            this.type = {};
            this.name = '';
            this.primary = false;
            this.allowNegative = false;
            this.balance = ''
        }

        PO.prototype = {};

        /**
         * Get PO index by guid
         * @param guid
         * @returns {number}
         * @private
         */
        function _getPOIndexByGuid (guid) {
            var po = null;
            var pos = $scope.pos.data.filter(function (item) {
                return item.guid === guid;
            });
            if (pos.length === 1) {
                po = pos[0];
                return $scope.pos.data.indexOf(po)
            }
            return -1;
        }

        /**
         * Opens edit PO modal
         * @private
         */
        function _editPOModal(guid) {
            if (!guid) {
                $ToastrService.error();
            } else {
                $state.go('sett.po.action', { action: 'edit', guid: guid });
            }
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

    POCtrl.$inject = ['$scope', '$q', '$CommonService', '$POService', '$CurrencyService', '$ToastrService', '$state'];

    angular
        .module('CashAppSett')
        .controller('po-controller', POCtrl)

})(angular);