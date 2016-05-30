describe('TransactionIncome tests', function () {
    var $controller;
    var $httpBackend;
    var $state;

    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$state_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
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
            controller = $controller('transaction-income-controller', {
                $scope: $scope
            });
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/my/po/').respond(200, {});
            $httpBackend.whenGET('/my/po/details/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/po//').respond(500, { types: [{ name: 'card'}, { name: 'cash'}]});
        });
    
        it('should be an getting data error', function () {
            $httpBackend.flush();
        });
    });

    describe('Transaction income modal', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            var guid = '42';
            $scope = {
                transactionForm: {name: ''}
            };
            controller = $controller('transaction-income-controller', {
                $scope: $scope,
                $stateParams: { guid: guid }
            });
            
            spyOn($state, 'go');

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/my/po/').respond(200, {});
            $httpBackend.whenGET('/my/po/details/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/po/' + guid + '/').respond(200, { po: {name: 'test', guid: guid}});

            $httpBackend.flush();
        });
        
        it('should be initialized $scope.po', function () {
            expect($scope.po.name).toBe('test');
        });

        it('should be transaction creation success', function () {
            $httpBackend.whenPOST('/api/cmn/transaction/income/').respond(201, { transaction: { name: 'test01'}});

            $scope.transaction = {
                date: new Date()
            };
            
            $scope.createTransaction();
            
            $httpBackend.flush();
        });
    });
});
