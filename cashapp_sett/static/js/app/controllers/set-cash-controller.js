(function (angular) {

    function SetCashCtrl ($scope, $SettService) {
        $scope.cardsModel = {};
        $scope.currencies = [];

        /**
         * Card class
         * @constructor
         */
        function Card () {
            this.name = '';
            this.balance = '';
            this.currency = {};
        }

        Card.prototype = {
            /**
             * Set currency value
             * @param currency
             */
            setCurrency: function (currency) {
                this.currency = currency;
            }
        };

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

    SetCashCtrl.$inject = ['$scope', '$SettService'];

    angular
        .module('CashAppSett')
        .controller('set-cash-controller', SetCashCtrl)

})(angular);
