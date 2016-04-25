/**
 * TODO issues:
 *  1. Setting default currency as a default select value
 *  2. Helps around the controls
 *  3. Ability to edit card names
 */

(function (angular) {

    function POCtrl ($scope, $q, $CommonService, $POService, $CurrencyService, $ToastrService, $state) {
        $scope.cardsModel = {};
        $scope.cashesModel = {};
        $scope.currencies = [];

        $scope.pos = {
            data: null,
            edit: _editPOModal
        };

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
         * Cash class
         * @constructor
         */
        function Cash () {
            this.id = 0;
            this.balance = '';
            this.currency = {};
            this.error = '';
            this.guid = ''
        }

        Cash.prototype = {};

        /**
         * Card class
         * @constructor
         */
        function Card () {
            this.name = '';

            Cash.call(this);
        }

        $CommonService.extendBase(Cash, Card);

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