(function (angular) {

    function SetCashCtrl ($scope, $SettService, $CommonService, $CashService) {
        $scope.cardsModel = {};
        $scope.cashesModel = {};
        $scope.currencies = [];

        function Cash () {
            this.balance = '';
            this.currency = {}
        }

        Cash.prototype = {
            /**
             * Set currency value
             * @param currency
             */
            setCurrency: function (currency) {
                this.currency = currency;
            }
        };

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
         * Function ti init $scope
         */
        function initScope () {
            $scope.cardsModel = {
                /**
                 * List of cards
                 */
                cards: [new Card()],

                /**
                 * Adds a new card to model
                 */
                addCard: function () {
                    this.cards.push(new Card());
                },
                /**
                 * Removes card from model by index
                 * @param cardIndex
                 */
                removeCard: function (cardIndex) {
                    this.cards.splice(cardIndex, 1);
                },
                /**
                 * Save current model
                 */
                save: function () {
                    $CashService.createCash(this.cards, 'card')
                },
                /**
                 * Reset scope data
                 */
                reset: function () {
                    this.cards = [new Card()];
                }
            };

            $scope.cashesModel = {
                /**
                 * List of cashes
                 */
                cashes: [new Cash()],
                /**
                 * Adds a new cash to the model
                 */
                addCash: function () {
                    this.cashes.push(new Cash());
                },
                /**
                 * Removes cash from the model by index
                 * @param cashIndex
                 */
                removeCash: function (cashIndex) {
                    this.cashes.splice(cashIndex, 1)
                },
                /**
                 * Save current model
                 */
                save: function () {
                    $CashService.createCash(this.cashes, 'cash')
                },
                /**
                 * Reset scope data
                 */
                reset: function () {
                    this.cashes = [new Cash()];
                }
            };
            /**
             * Success callback
             */
            function onGetCurrenciesListSuccess(response) {
                $scope.currencies = response.data.currencies;
            }

            /**
             * Error callback
             */
            function onGetCurrenciesListError() {

            }

            $SettService.getCurrenciresList()
                .then(onGetCurrenciesListSuccess)
                .catch(onGetCurrenciesListError)
        }

        initScope();
    }

    SetCashCtrl.$inject = ['$scope', '$SettService', '$CommonService', '$CashService'];

    angular
        .module('CashAppSett')
        .controller('set-cash-controller', SetCashCtrl)

})(angular);