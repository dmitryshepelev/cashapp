describe('POController tests', function () {
    var $controller;
    var $httpBackend;

    beforeEach(module('CashAppSett'));

    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('PO Controller', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});

            $httpBackend.expectGET('/api/cmn/po/card/').respond(500, { card: [{ balance: '5000', guid: 'be03575b06989bddf06e4e1b7a85fc703e326255', name: 'card', currency: { code: 'BYR'}}]});
            $httpBackend.expectGET('/api/cmn/po/cash/').respond(200, { cash: []});
        });

        it('should be an gettin data error', function () {
            $httpBackend.flush();
        });
    });

    describe('currencies', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });
            console.log(controller);
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});

            $httpBackend.expectGET('/api/cmn/po/card/').respond(200, { card: []});
            $httpBackend.expectGET('/api/cmn/po/cash/').respond(200, { cash: []});

            $httpBackend.flush();
        });

        it('should be initialized currencies', function () {
            expect($scope.currencies.length).toEqual(2)
        });
    });

    describe('cardsModel initial data', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});

            $httpBackend.expectGET('/api/cmn/po/card/').respond(200, { card: [{ balance: '5000', guid: 'be03575b06989bddf06e4e1b7a85fc703e326255', name: 'card', currency: { code: 'BYR'}}]});
            $httpBackend.expectGET('/api/cmn/po/cash/').respond(200, { cash: []});

            $httpBackend.flush();
        });

        it('should be a default cardsModel with initial data', function () {
            expect($scope.cardsModel.cards.length).toEqual(1);
            expect($scope.cardsModel.cards[0].id).toEqual(undefined);
            expect($scope.cardsModel.cards[0].name).toEqual('card');
            expect($scope.cardsModel.cards[0].currency).toEqual({});
        });
    });

    describe('cardsModel empty', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});

            $httpBackend.expectGET('/api/cmn/po/card/').respond(200, { card: []});
            $httpBackend.expectGET('/api/cmn/po/cash/').respond(200, { cash: []});

            $httpBackend.flush();
        });

        it('should be a default cardsModel', function () {
            expect($scope.cardsModel.cards.length).toEqual(1);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
            expect($scope.cardsModel.cards[0].name).toEqual('');
            expect($scope.cardsModel.cards[0].guid).toEqual('');
        });

        it('should be a new added card', function () {
            $scope.cardsModel.addCard();

            expect($scope.cardsModel.cards.length).toEqual(2);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
            expect($scope.cardsModel.cards[1].id).toEqual(1);
        });

        it('should be maximum cards in model', function () {
            for (var i = 1; i < 10; i++) {
                $scope.cardsModel.addCard();
            }

            expect($scope.cardsModel.cards.length).toEqual(10);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
            expect($scope.cardsModel.cards[9].id).toEqual(9);
        });

        it('should be maximum cards in model when model is overflow', function () {
            for (var i = 1; i < 11; i++) {
                $scope.cardsModel.addCard();
            }

            expect($scope.cardsModel.cards.length).toEqual(10);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
            expect($scope.cardsModel.cards[9].id).toEqual(9);
        });

        it('should be removed the third card in model', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
            }

            expect($scope.cardsModel.cards.length).toEqual(5);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
            expect($scope.cardsModel.cards[4].id).toEqual(4);

            $scope.cardsModel.removeCard($scope.cardsModel.cards[3]);

            expect($scope.cardsModel.cards.length).toEqual(4);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
            expect($scope.cardsModel.cards[3].id).toEqual(4);
        });

        it('should be trying to remove the first and single card', function () {
            expect($scope.cardsModel.cards.length).toEqual(1);
            expect($scope.cardsModel.cards[0].id).toEqual(0);

            $scope.cardsModel.removeCard($scope.cardsModel.cards[0]);

            expect($scope.cardsModel.cards.length).toEqual(1);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
        });

        it('should be a Card instance get by id', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
            }

            var card = $scope.cardsModel.getCardById(3);

            expect(card.id).toEqual(3);
            expect($scope.cardsModel.cards[3]).toEqual(card);
        });

        it('should be an empty Card instance get by invalid id', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
            }

            expect($scope.cardsModel.getCardById(5)).toEqual({});
        });

        it('should be an array of unsaved cards', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
            }

            expect($scope.cardsModel.getUnsavedCards().length).toEqual(5);
        });

        it('should be a reset of the model (all instances are unsaved)', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
            }

            expect($scope.cardsModel.cards.length).toEqual(5);

            $scope.cardsModel.reset();

            expect($scope.cardsModel.cards.length).toEqual(1);
            expect($scope.cardsModel.cards[0].id).toEqual(0);
        });

        it('should be a reset of the model (all instances are saved)', function () {
            $scope.cardsModel.cards[0].guid = 0 + 'hash' + 0;
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
                $scope.cardsModel.cards[i].guid = i + 'hash' + i;
            }

            expect($scope.cardsModel.cards.length).toEqual(5);

            $scope.cardsModel.reset();

            expect($scope.cardsModel.cards.length).toEqual(5);
            expect($scope.cardsModel.cards[4].guid).toEqual(4 + 'hash' + 4);
        });

        it('should be a reset of the model (several instances are saved)', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cardsModel.addCard();
                if (i == 2 || i == 3) {
                    $scope.cardsModel.cards[i].guid = i + 'hash' + i;
                }
            }

            expect($scope.cardsModel.cards.length).toEqual(5);

            $scope.cardsModel.reset();

            expect($scope.cardsModel.cards.length).toEqual(2);
            expect($scope.cardsModel.cards[1].guid).toEqual(3 + 'hash' + 3);
        });

        it('should be an one saved instance of CardModel', function () {
            var id = 0;
            var guid = '1234567890guid';

            $httpBackend.whenPOST('/api/cmn/po/card/').respond(201, { instances: [{ id: id, guid: guid }]});

            $scope.cardsModel.cards[id].balance = 5000;

            $scope.cardsModel.save();

            expect($scope.cardsModel.cards.length).toEqual(1);

            $httpBackend.flush();
        });

        it('should be an one saved instance of CardModel (invalid response data)', function () {
            var id = 0;
            var guid = '1234567890guid';

            $httpBackend.whenPOST('/api/cmn/po/card/').respond(201, { instances: [{ id: id, error: 'some error' }]});

            $scope.cardsModel.cards[id].balance = 5000;

            $scope.cardsModel.save();

            expect($scope.cardsModel.cards.length).toEqual(1);

            $httpBackend.flush();
        });

        it('should be an one saved instance of CardModel (response data is empty)', function () {
            var id = 0;
            var guid = '1234567890guid';

            $httpBackend.whenPOST('/api/cmn/po/card/').respond(201, {});

            $scope.cardsModel.cards[id].balance = 5000;

            $scope.cardsModel.save();

            expect($scope.cardsModel.cards.length).toEqual(1);

            $httpBackend.flush();
        });
    });

    describe('cashesModel initial data', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});

            $httpBackend.expectGET('/api/cmn/po/card/').respond(200, { card: []});
            $httpBackend.expectGET('/api/cmn/po/cash/').respond(200, { cash: [{ balance: '5000', guid: 'be03575b06989bddf06e4e1b7a85fc703e326255', name: null, currency: { code: 'BYR'}}]});

            $httpBackend.flush();
        });

        it('should be a default cardsModel with initial data', function () {
            expect($scope.cashesModel.cashes.length).toEqual(1);
            expect($scope.cashesModel.cashes[0].id).toEqual(undefined);
            expect($scope.cashesModel.cashes[0].name).toEqual(null);
            expect($scope.cashesModel.cashes[0].currency).toEqual({});
        });
    });

    describe('cashesModel empty', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, {currencies: [{code: 'USD'}, {code: 'BYR'}]});

            $httpBackend.expectGET('/api/cmn/po/card/').respond(200, {card: []});
            $httpBackend.expectGET('/api/cmn/po/cash/').respond(200, {cash: []});

            $httpBackend.flush();
        });

        it('should be a default cashesModel', function () {
            expect($scope.cashesModel.cashes.length).toEqual(1);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
            expect($scope.cashesModel.cashes[0].guid).toEqual('');
        });

        it('should be a new added cash', function () {
            $scope.cashesModel.addCash();

            expect($scope.cashesModel.cashes.length).toEqual(2);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
            expect($scope.cashesModel.cashes[1].id).toEqual(1);
        });

        it('should be maximum cashes in model', function () {
            for (var i = 1; i < 6; i++) {
                $scope.cashesModel.addCash();
            }

            expect($scope.cashesModel.cashes.length).toEqual(6);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
            expect($scope.cashesModel.cashes[5].id).toEqual(5);
        });

        it('should be maximum cashes in model when model is overflow', function () {
            for (var i = 1; i < 7; i++) {
                $scope.cashesModel.addCash();
            }

            expect($scope.cashesModel.cashes.length).toEqual(6);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
            expect($scope.cashesModel.cashes[5].id).toEqual(5);
        });

        it('should be removed the third cash in model', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
            }

            expect($scope.cashesModel.cashes.length).toEqual(5);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
            expect($scope.cashesModel.cashes[4].id).toEqual(4);

            $scope.cashesModel.removeCash($scope.cashesModel.cashes[3]);

            expect($scope.cashesModel.cashes.length).toEqual(4);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
            expect($scope.cashesModel.cashes[3].id).toEqual(4);
        });

        it('should be trying to remove the first and single cash', function () {
            expect($scope.cashesModel.cashes.length).toEqual(1);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);

            $scope.cashesModel.removeCash($scope.cashesModel.cashes[0]);

            expect($scope.cashesModel.cashes.length).toEqual(1);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
        });

        it('should be a Cash instance get by id', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
            }

            var cash = $scope.cashesModel.getCashById(3);

            expect(cash.id).toEqual(3);
            expect($scope.cashesModel.cashes[3]).toEqual(cash);
        });

        it('should be an empty Cash instance get by invalid id', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
            }

            expect($scope.cashesModel.getCashById(5)).toEqual({});
        });

        it('should be an array of unsaved cashes', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
            }

            expect($scope.cashesModel.getUnsavedCashes().length).toEqual(5);
        });

        it('should be a reset of the model (all instances are unsaved)', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
            }

            expect($scope.cashesModel.cashes.length).toEqual(5);

            $scope.cashesModel.reset();

            expect($scope.cashesModel.cashes.length).toEqual(1);
            expect($scope.cashesModel.cashes[0].id).toEqual(0);
        });

        it('should be a reset of the model (all instances are saved)', function () {
            $scope.cashesModel.cashes[0].guid = 0 + 'hash' + 0;
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
                $scope.cashesModel.cashes[i].guid = i + 'hash' + i;
            }

            expect($scope.cashesModel.cashes.length).toEqual(5);

            $scope.cashesModel.reset();

            expect($scope.cashesModel.cashes.length).toEqual(5);
            expect($scope.cashesModel.cashes[4].guid).toEqual(4 + 'hash' + 4);
        });

        it('should be a reset of the model (several instances are saved)', function () {
            for (var i = 1; i < 5; i++) {
                $scope.cashesModel.addCash();
                if (i == 2 || i == 3) {
                    $scope.cashesModel.cashes[i].guid = i + 'hash' + i;
                }
            }

            expect($scope.cashesModel.cashes.length).toEqual(5);

            $scope.cashesModel.reset();

            expect($scope.cashesModel.cashes.length).toEqual(2);
            expect($scope.cashesModel.cashes[1].guid).toEqual(3 + 'hash' + 3);
        });

        it('should be an one saved instance of CashModel', function () {
            var id = 0;
            var guid = '1234567890guid';

            $httpBackend.whenPOST('/api/cmn/po/cash/').respond(201, {instances: [{id: id, guid: guid}]});

            $scope.cashesModel.cashes[id].balance = 5000;

            $scope.cashesModel.save();

            expect($scope.cashesModel.cashes.length).toEqual(1);

            $httpBackend.flush();
        });

        it('should be an one saved instance of CashModel (invalid response data)', function () {
            var id = 0;
            var guid = '1234567890guid';

            $httpBackend.whenPOST('/api/cmn/po/cash/').respond(201, {instances: [{id: id, error: 'some error'}]});

            $scope.cashesModel.cashes[id].balance = 5000;

            $scope.cashesModel.save();

            expect($scope.cashesModel.cashes.length).toEqual(1);

            $httpBackend.flush();
        });

        it('should be an one saved instance of CashModel (response data is empty)', function () {
            var id = 0;
            var guid = '1234567890guid';

            $httpBackend.whenPOST('/api/cmn/po/cash/').respond(201, {});

            $scope.cashesModel.cashes[id].balance = 5000;

            $scope.cashesModel.save();

            expect($scope.cashesModel.cashes.length).toEqual(1);

            $httpBackend.flush();
        });
    });
});