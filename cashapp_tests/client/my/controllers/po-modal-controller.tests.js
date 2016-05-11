describe('POModalController tests', function () {
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

    describe('PO Modal Controller errors', function () {
        var $scope;
        var controller;
    
        beforeEach(function () {
            $scope = {};
            controller = $controller('po-modal-controller', {
                $scope: $scope,
                $uibModalInstance: uibModalInstance
            });
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});
            $httpBackend.whenGET('/api/cmn/po_types/').respond(500, { types: [{ name: 'card'}, { name: 'cash'}]});
        });
    
        it('should be an gettin data error', function () {
            $httpBackend.flush();
        });
    });

    describe('PO Controller add', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {
                poForm: {name: ''}
            };
            controller = $controller('po-modal-controller', {
                $scope: $scope,
                $uibModalInstance: uibModalInstance,
                $stateParams: {action: 'add'}
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, {currencies: [{code: 'USD'}, {code: 'BYR'}]});
            $httpBackend.whenGET('/api/cmn/po_types/').respond(200, {types: [{name: 'card'}, {name: 'cash'}]});

            $httpBackend.flush();
        });

        it('should be initialized currencies', function () {
            expect($scope.currencies.length).toEqual(2)
        });

        it('should be add mode', function () {
            expect($scope.isEditMode).toEqual(false)
        });

        it('should be a server error on add', function () {
            $httpBackend.whenPOST('/api/cmn/po/').respond(500, {});

            $scope.po = {name: 'test'};

            $scope.managePO();

            $httpBackend.flush();
        });

        it('should be an success adding', function () {
            $httpBackend.whenPOST('/api/cmn/po/').respond(201, {po: {name: 'test'}});

            $scope.po = {name: 'test'};

            $scope.managePO();

            $httpBackend.flush();
        });

    });

    describe('PO Modal Controller edit', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            var guid = '42';
            $scope = {
                poForm: { name: '' }
            };
            controller = $controller('po-modal-controller', {
                $scope: $scope,
                $uibModalInstance: uibModalInstance,
                $stateParams: { action: 'edit', guid: guid }
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});
            $httpBackend.whenGET('/api/cmn/po_types/').respond(200, { types: [{ name: 'card'}, { name: 'cash' }]});
            $httpBackend.whenGET('/api/cmn/po/' + guid + '/').respond(200, { po: { name: 'test', guid: guid }});

            $httpBackend.flush();
        });

        it('should be edit mode', function () {
            expect($scope.isEditMode).toEqual(true)
        });
        
        it('should be init po', function () {
            expect($scope.po.name).toEqual('test')
        });

        it('should be a success editing', function () {
            $httpBackend.whenPUT('/api/cmn/po/').respond(200, {po: {name: '45'}});
            
            $scope.po.name = 45;

            $scope.managePO();

            $httpBackend.flush();
        });
    });
});