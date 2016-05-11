describe('TransactionIncomeModal tests', function () {
    var $controller;
    var $httpBackend;
    
    var uibModalInstance = {
        close: function () {}
    }

    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Transaction income modal errors', function () {
        var $scope;
        var controller;
    
        beforeEach(function () {
            $scope = {};
            controller = $controller('transaction-modal-income-controller', {
                $scope: $scope,
                $uibModalInstance: uibModalInstance
            });
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/po/').respond(500, { types: [{ name: 'card'}, { name: 'cash'}]});
        });
    
        it('should be an gettin data error', function () {
            $httpBackend.flush();
        });
    });

    describe('Transaction income modal. Pre selected PO', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            var guid = '42';
            $scope = {
                transactionForm: {name: ''}
            };
            controller = $controller('transaction-modal-income-controller', {
                $scope: $scope,
                $uibModalInstance: uibModalInstance,
                $stateParams: { guid: guid }
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/po/' + guid + '/').respond(200, { po: {name: 'test', guid: guid}});

            $httpBackend.flush();
        });

        it('should be predefined po', function () {
            expect($scope.isPOPredefined).toEqual(true)
        });

        it('should be transaction creation success', function () {
            $httpBackend.whenPOST('/api/cmn/transaction/income/').respond(201, { transaction: { }});

            $scope.transaction = {
                date: new Date()
            };

            $scope.createTransaction();
            
            $httpBackend.flush();
        });
    });
});
