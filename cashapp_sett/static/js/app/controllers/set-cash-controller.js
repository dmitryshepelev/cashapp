/**
 * TODO issues:
 *  1. Setting default currency as a default select value
 *  2. Helps around the controls
 *  3. Load created cashes on load
 *  4. Ability to edit card names
 */

(function (angular) {

    function SetCashCtrl ($scope, $SettService, $CommonService, $CashService, $ToastrService) {
        $scope.cardsModel = {};
        $scope.cashesModel = {};
        $scope.currencies = [];

        /**
         * Cah class
         * @constructor
         */
        function Cash () {
            this.id = 0;
            this.balance = '';
            this.currency = {};
            this.created = '';
            this.error = ''
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
         * Adds a new instance to an array
         * @param arr
         * @param Type
         */
        function addInstance(arr, Type) {
            var newInstance = new Type();
            newInstance.id = arr.length;
            arr.push(newInstance)
        }

        /**
         * Delete instances from array if they are not saved
         * Reinit with Type empty instance if all items are deleted
         * @param arr
         * @param Type
         */
        function deleteUnsavedInstances(arr, Type) {
            var newArr = arr.filter(function (item) {
                return item.created;
            });
            return newArr.length == 0 ? [new Type()] : newArr;
        }

        /**
         * Success callback
         * @param response
         */
        function onCashSaveSuccess(response) {
            var instances = response.data.instances || [];

            instances.forEach(function (instance) {
                var model = $scope.cashesModel.getCashById(instance.id);
                if (model) {
                    model.created = instance.created;
                    model.error = instance.error ? instance.error.toString() : '';
                }
            })
        }

        /**
         * Success callback
         * @param response
         */
        function onCardSaveSuccess(response) {
            var instances = response.data.instances || [];

            instances.forEach(function (instance) {
                var model = $scope.cardsModel.getCardById(instance.id);
                if (model) {
                    model.created = instance.created;
                    model.error = instance.error ? instance.error.toString() : '';
                }
            })
        }

        /**
         * Error callback
         * @param response
         */
        function onSaveError (response) {
            $ToastrService.messageFromResponse(response);
        }

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
                    if (this.addingEnable) {
                        addInstance(this.cards, Card);
                        this.toggleAdding();
                    }
                },
                /**
                 * Flag if new item adding enabled
                 */
                addingEnable: true,
                /**
                 * Set the addingEnable flag
                 */
                toggleAdding: function () {
                    this.addingEnable = this.cards.length < 10;
                },
                /**
                 * Removes card from model by index
                 * @param cardIndex
                 */
                removeCard: function (cardIndex) {
                    this.cards.splice(cardIndex, 1);
                    this.toggleAdding();
                },
                /**
                 * Returns Card instance of cardModel.cards by id
                 * @param id
                 */
                getCardById: function (id) {
                    var card = this.cards.filter(function (card) {
                        return card.id == id;
                    });
                    return card ? card[0] : {}
                },
                /**
                 * Returns array of uncreated cards
                 */
                getUnsavedCards: function () {
                    return this.cards.filter(function (card) {
                        return !card.created;
                    });
                },
                /**
                 * Save current model
                 */
                save: function () {
                    var cardsToSave = this.getUnsavedCards();
                    $CashService.createCash(cardsToSave, 'card')
                        .then(onCardSaveSuccess)
                        .catch(onSaveError)
                },
                /**
                 * Reset scope data
                 */
                reset: function () {
                    this.cards = deleteUnsavedInstances(this.cards, Card);
                    this.toggleAdding();
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
                    if (this.addingEnable) {
                        addInstance(this.cashes, Cash);
                        this.toggleAdding();
                    }
                },
                /**
                 * Flag if new item adding enabled
                 */
                addingEnable: true,
                /**
                 * Set the addingEnable flag
                 */
                toggleAdding: function () {
                    this.addingEnable = this.cashes.length < 6;
                },
                /**
                 * Removes cash from the model by index
                 * @param cashIndex
                 */
                removeCash: function (cashIndex) {
                    this.cashes.splice(cashIndex, 1);
                    this.toggleAdding()
                },
                /**
                 * Returns Cash instance of cashModel.cashes by id
                 * @param id
                 */
                getCashById: function (id) {
                    var cash = this.cashes.filter(function (cash) {
                        return cash.id == id;
                    });
                    return cash ? cash[0] : {}
                },
                /**
                 * Returns array of unsaved cashes
                 */
                getUnsavedCashes: function () {
                    return this.cashes.filter(function (cash) {
                        return !cash.created;
                    });
                },
                /**
                 * Save current model
                 */
                save: function () {
                    var cashesToSave = this.getUnsavedCashes();
                    $CashService.createCash(cashesToSave, 'cash')
                        .then(onCashSaveSuccess)
                        .catch(onSaveError)
                },
                /**
                 * Reset scope data
                 */
                reset: function () {
                    this.cashes = deleteUnsavedInstances(this.cashes, Cash);
                    this.toggleAdding()
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
            function onGetCurrenciesListError(response) {
                $ToastrService.messageFromResponse(response);
            }

            $SettService.getCurrenciresList()
                .then(onGetCurrenciesListSuccess)
                .catch(onGetCurrenciesListError)
        }

        initScope();
    }

    SetCashCtrl.$inject = ['$scope', '$SettService', '$CommonService', '$CashService', '$ToastrService'];

    angular
        .module('CashAppSett')
        .controller('set-cash-controller', SetCashCtrl)

})(angular);