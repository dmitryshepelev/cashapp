describe('SupplierCtrl controller tests', function () {
    var $controller;
    var $httpBackend;
    var $rootScope;
    var $ToastrService;

    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _$ToastrService_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $ToastrService = _$ToastrService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('main tests', function () {
        var $scope;
        var controller;
        var recentSupplier = [
            { name: 'test_01', guid: 'test_01' },
            { name: 'test_02', guid: 'test_02' },
            { name: 'test_03', guid: 'test_03' },
            { name: 'test_04', guid: 'test_04' }
        ];
        
        beforeEach(function () {
            $scope = $rootScope.$new();
            controller = $controller('supplier-controller', {
                $scope: $scope
            });

            spyOn($ToastrService, 'messageFromResponse');
            
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/my/uiview/').respond(200, {});
            $httpBackend.whenGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/supplier/?count=5').respond(200, { supplier: recentSupplier });
            
            $httpBackend.flush();    
        });

        it('should be a non-initialized $scope.suppliers', function () {
            expect($scope.suppliers).toBeNull()
        });
        
        it('should be a initialized $scope.recentSuppliers', function () {
            expect($scope.recentSuppliers.length).toBe(recentSupplier.length);
        });

        it('should be a searched supplier', function () {
            $httpBackend.whenGET('/api/cmn/search/?type=supplier&q=04').respond(200, { instances: [recentSupplier[3]]});
            
            $scope.supplierQuery = '04';
            
            $httpBackend.flush();
            expect($scope.suppliers[0]).toEqual(recentSupplier[3]);
        });

        it('should be an error during search supplier', function () {
            $httpBackend.whenGET('/api/cmn/search/?type=supplier&q=04').respond(500, {});

            $scope.supplierQuery = '04';

            $httpBackend.flush();
            expect($ToastrService.messageFromResponse).toHaveBeenCalled();
        })
    });
    
    describe('$rootScope events', function () {
        var $scope;
        var controller;
        
        beforeEach(function () {
            $scope = $rootScope.$new();
            controller = $controller('supplier-controller', {
                $scope: $scope
            });

            spyOn($ToastrService, 'messageFromResponse');
            
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/my/uiview/').respond(200, {});
            $httpBackend.whenGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/supplier/?count=5').respond(200, { supplier: [{ name: 'test_01', guid: 'test_01' }] });
            
            $httpBackend.flush();    
        });

        it('should be Supplier.addSuccess event handled', function () {
            var newSupplier = {
                name: 'test_supplier',
                guid: 'test_guid'
            };

            var recentSuppliersLength = $scope.recentSuppliers.length; 

            $rootScope.$broadcast('Supplier.addSuccess', newSupplier);
            expect($scope.recentSuppliers.length).toBe(recentSuppliersLength + 1);
        });
        
        it('should be Supplier.editSuccess event handled successful', function () {
            var editedSupplier = {
                name: 'test_supplier',
                guid: 'test_01'
            };

            $rootScope.$broadcast('Supplier.editSuccess', editedSupplier);
            expect($scope.recentSuppliers[0].name).toBe(editedSupplier.name);
        });
        
        it('should be Supplier.editSuccess event handled error', function () {
            var editedSupplier = {
                name: 'test_supplier',
                guid: 'test_guid'
            };
            
            var existingSupplierName = $scope.recentSuppliers[0].name;
            
            $rootScope.$broadcast('Supplier.editSuccess', editedSupplier);
            expect($scope.recentSuppliers[0].name).toBe(existingSupplierName);
        });
    })
});