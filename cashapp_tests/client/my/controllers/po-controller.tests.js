describe('POController tests', function () {
    var $controller;
    var $httpBackend;

    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('PO Controller errors', function () {
        var $scope;
        var controller;
    
        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});
            $httpBackend.whenGET('/api/cmn/po/').respond(500, {});

        });
    
        it('should be an gettin data error', function () {
            $httpBackend.flush();
        });
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
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});
            $httpBackend.whenGET('/api/cmn/po/').respond(200, { po: [{ name: 'test', guid: '1234567890' }]});
            $httpBackend.whenGET('po/modal/').respond(200, '');
            
            $httpBackend.flush();
        });

        it('should be initialized currencies', function () {
            expect($scope.currencies.length).toEqual(2)
        });
        
        it('should be index of existing po', function () {
            var guid = '1234567890';
            
            var index = $scope.pos.getIndexByGuid(guid);
            expect(index).toBe(0);
        });

        it('should be index of non-existing po', function () {
            var guid = '123456789';

            var index = $scope.pos.getIndexByGuid(guid);
            expect(index).toBe(-1);
        });

        it('should be call of getIndexByGuid without parameter.', function () {
            expect(function () { $scope.pos.getIndexByGuid() }).toThrow();
        });
        
        it('should be multiple result exception.', function () {
            var guid = '1234567890';
            
            $scope.pos.data.push({ name: 'test_1', guid: guid });
            expect(function () { $scope.pos.getIndexByGuid(guid) }).toThrow();
        });
        
        it('should be an error transfer to manage po modal', function () {
            expect($scope.pos.manage());
        });
    });
});