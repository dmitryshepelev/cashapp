(function (angular) {

    function SetCashCtrl ($scope, $SettService, $CommonService) {
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

        //Card.prototype = Object.create(Cash.prototype);
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
                }
            };

            /**
             * Reinit $scope with default values
             */
            $scope.resetScope = initScope;

            /**
             * Save models
             */
            $scope.save = function () {
                var data = {
                        cashes: $scope.cashesModel.cashes,
                        cards: $scope.cardsModel.cards
                    };
                $SettService.setInitCash(data)
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

    SetCashCtrl.$inject = ['$scope', '$SettService', '$CommonService'];

    angular
        .module('CashAppSett')
        .controller('set-cash-controller', SetCashCtrl)

})(angular);