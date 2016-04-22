/**
 * TODO issues:
 *  1. Setting default currency as a default select value
 *  2. Helps around the controls
 *  3. Ability to edit card names
 */

(function (angular) {

    function POCtrl ($scope, $q, $CommonService, $POService, $CurrencyService, $ToastrService) {
        $scope.cardsModel = {};
        $scope.cashesModel = {};
        $scope.currencies = [];

        $scope.pos = null;

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
         * Cah class
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
         * Adds a new instance to an array
         * @param arr
         * @param Type
         */
        function addInstance(arr, Type) {
            var newInstance = new Type();
            newInstance.id = arr[arr.length - 1].id + 1 || 0;
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
                return item.guid != '';
            });
            return newArr.length == 0 ? [new Type()] : newArr;
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
             * Get currency object by its code
             * @param code
             * @returns {T}
             */
            function getCurrencyByCode (code) {
                var values = $scope.currencies.filter(function (item) {
                    return item.code == code;
                });
                return values.length > 0 ? values[0] : {}
            }

            /**
             * Init $scope.currencies
             * @param currencies
             */
            function initCurrencies(currencies) {
                $scope.currencies = currencies;
            }

            /**
             * Init $scope.cardsModel
             * @param cards
             */
            function initCardsModel(cards) {

                cards.map(function (card) {
                    card.currency = getCurrencyByCode(card.currency);
                });

                /**
                 * Success callback
                 * @param response
                 */
                function onCardSaveSuccess(response) {
                    var instances = response.data.instances || [];

                    instances.forEach(function (instance) {
                        var model = $scope.cardsModel.getCardById(instance.id);
                        if (model) {
                            model.guid = instance.guid;
                            model.error = instance.error ? instance.error.toString() : '';
                        } else {

                        }
                    });
                }

                $scope.cardsModel = {
                    /**
                     * List of cards
                     */
                    cards: cards.length == 0 ? [new Card()] : cards,
                    /**
                     * Adds a new card to model
                     */
                    addCard: function () {
                        if (this.addingEnable) {
                            addInstance(this.cards, Card);
                            this.toggleAdding();
                        } else {
                            return 0;
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
                     * @param card
                     */
                    removeCard: function (card) {
                        var index = this.cards.indexOf(card);
                        if (index > 0) {
                            this.cards.splice(index, 1);
                            this.toggleAdding();
                        } else {
                            return 0;
                        }
                    },
                    /**
                     * Returns Card instance of cardModel.cards by id
                     * @param id
                     */
                    getCardById: function (id) {
                        var card = this.cards.filter(function (card) {
                            return card.id == id;
                        });
                        return card.length !== 0 ? card[0] : {}
                    },
                    /**
                     * Returns array of uncreated cards
                     */
                    getUnsavedCards: function () {
                        return this.cards.filter(function (card) {
                            return card.guid === '';
                        });
                    },
                    /**
                     * Save current model
                     */
                    save: function () {
                        var cardsToSave = this.getUnsavedCards();
                        $POService.create(cardsToSave, 'card')
                            .then(onCardSaveSuccess)
                            .catch(onError)
                    },
                    /**
                     * Reset scope data
                     */
                    reset: function () {
                        this.cards = deleteUnsavedInstances(this.cards, Card);
                        this.toggleAdding();
                    }
                };

                $scope.cardsModel.toggleAdding()
            }

            /**
             * init $scope.cashesModel
             * @param cashes
             */
            function initCashesModel(cashes) {

                cashes.map(function (cash) {
                    cash.currency = getCurrencyByCode(cash.currency);
                });

                /**
                 * Success callback
                 * @param response
                 */
                function onCashSaveSuccess(response) {
                    var instances = response.data.instances || [];

                    instances.forEach(function (instance) {
                        var model = $scope.cashesModel.getCashById(instance.id);
                        if (model) {
                            model.guid = instance.guid;
                            model.error = instance.error ? instance.error.toString() : '';
                        }
                    })
                }

                $scope.cashesModel = {
                    /**
                     * List of cashes
                     */
                    cashes: cashes.length == 0 ? [new Cash()] : cashes,
                    /**
                     * Adds a new cash to the model
                     */
                    addCash: function () {
                        if (this.addingEnable) {
                            addInstance(this.cashes, Cash);
                            this.toggleAdding();
                        } else {
                            return 0;
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
                     * @param cash
                     */
                    removeCash: function (cash) {
                        var index = this.cashes.indexOf(cash);
                        if (index > 0) {
                            this.cashes.splice(index, 1);
                            this.toggleAdding()
                        } else {
                            return 0;
                        }
                    },
                    /**
                     * Returns Cash instance of cashModel.cashes by id
                     * @param id
                     */
                    getCashById: function (id) {
                        var cash = this.cashes.filter(function (cash) {
                            return cash.id == id;
                        });
                        return cash.length !== 0 ? cash[0] : {}
                    },
                    /**
                     * Returns array of unsaved cashes
                     */
                    getUnsavedCashes: function () {
                        return this.cashes.filter(function (cash) {
                            return cash.guid === '';
                        });
                    },
                    /**
                     * Save current model
                     */
                    save: function () {
                        var cashesToSave = this.getUnsavedCashes();
                        $POService.create(cashesToSave, 'cash')
                            .then(onCashSaveSuccess)
                            .catch(onError)
                    },
                    /**
                     * Reset scope data
                     */
                    reset: function () {
                        this.cashes = deleteUnsavedInstances(this.cashes, Cash);
                        this.toggleAdding()
                    }
                };

                $scope.cashesModel.toggleAdding();
            }

            /**
             * init $scope.pos
             * @param pos
             */
            function initPOsModel(pos) {
                $scope.pos = pos;
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

    POCtrl.$inject = ['$scope', '$q', '$CommonService', '$POService', '$CurrencyService', '$ToastrService'];

    angular
        .module('CashAppSett')
        .controller('po-controller', POCtrl)

})(angular);