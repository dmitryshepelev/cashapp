describe('CategoryModalController tests', function () {
    var $controller;
    var $httpBackend;
    var $CategoryService;
    var $rootScope;
    var $ToastrService;
    var $validator;
    
    var uibModalInstance = {
        close: function () {}
    };
    
    beforeEach(module('CashAppMy'));
    
    beforeEach(inject(function (_$controller_, _$httpBackend_, _$CategoryService_, _$rootScope_, _$ToastrService_, _$validator_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $CategoryService = _$CategoryService_;
        $rootScope = _$rootScope_;
        $ToastrService = _$ToastrService_;
        $validator = _$validator_;
        
        spyOn($rootScope, '$broadcast');
        spyOn(uibModalInstance, 'close');
        spyOn($ToastrService, 'messageFromResponse');
    }));
    
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    describe('Add category', function () {
        var controllerParams = {
            $scope: {},
            $stateParams: {
                action: 'add'
            },
            $uibModalInstance: uibModalInstance
        };
        
        beforeEach(function () {
            spyOn($CategoryService, 'add').and.callThrough();
            
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/my/uiview/').respond(200, {});
            $httpBackend.whenGET('/my/dashboard/').respond(200, {});

            $httpBackend.flush();
        });

        describe('with no parent', function () {
            var $scope = {
                categoryForm: {}
            };
            var controller;

            beforeEach(function () {
                controllerParams.$scope = $scope;
                controller = $controller('category-modal-controller', controllerParams);
            });
            
            it('should be a add mode', function () {
                expect($scope.isEditMode).toBe(false);
            });
    
            it('should be an empty category object', function () {
                expect($scope.category).toEqual({});
            });

            it('should be $CategoryService add method called with correct data', function () {
                $httpBackend.whenPOST('/api/cmn/category/').respond(201, {});
                
                $scope.category = { name: 'test' };

                $scope.manageCategory();  
                $httpBackend.flush();
                expect($CategoryService.add).toHaveBeenCalledWith({ name: 'test', guid: undefined, parent_guid: undefined })
            });

            it('should be Category.addSuccess event to be broadcasted', function () {
                $httpBackend.whenPOST('/api/cmn/category/').respond(201, {});

                $scope.category = { name: 'test' };

                $scope.manageCategory();
                $httpBackend.flush();
                expect($rootScope.$broadcast).toHaveBeenCalled();
            });
            
            it('should be modal instance to be closed', function () {
                $httpBackend.whenPOST('/api/cmn/category/').respond(201, {});

                $scope.category = { name: 'test' };

                $scope.manageCategory();
                $httpBackend.flush();
                expect(uibModalInstance.close).toHaveBeenCalled();
            });

            it('should be an manageCategory response error', function () {
                $httpBackend.whenPOST('/api/cmn/category/').respond(500, {});

                spyOn($validator, 'validateFormResponse').and.throwError('validation error');

                $scope.category = { name: 'test' };

                $scope.manageCategory();
                $httpBackend.flush();
                expect($ToastrService.messageFromResponse).toHaveBeenCalled();
            })
        });

        describe('with parent', function () {
            var $scope = {
                categoryForm: {}
            };
            var controller;
            var parentGuid = 'parent_guid';

            beforeEach(function () {
                controllerParams.$scope = $scope;
                controllerParams.$stateParams.guid = parentGuid;
                controller = $controller('category-modal-controller', controllerParams);
            });

            it('should be a add mode', function () {
                expect($scope.isEditMode).toBe(false);
            });

            it('should be an initialized category object', function () {
                expect($scope.category).toEqual({});
            });

            it('should be $CategoryService add method called with correct data', function () {
                $httpBackend.whenPOST('/api/cmn/category/').respond(201, {});

                $scope.category.name = 'test';

                $scope.manageCategory();
                $httpBackend.flush();
                expect($CategoryService.add).toHaveBeenCalledWith({ name: 'test', guid: undefined, parent_guid: parentGuid })
            });
        });
    });

    describe('Edit category', function () {
        var category = { name: 'test', guid: 'test_guid' };
        var controllerParams = {
            $scope: {},
            $stateParams: {
                action: 'edit',
                subguid: category.guid
            },
            $uibModalInstance: uibModalInstance
        };

        beforeEach(function () {
            spyOn($CategoryService, 'edit').and.callThrough();

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.whenGET('/my/uiview/').respond(200, {});
            $httpBackend.whenGET('/my/dashboard/').respond(200, {});

            $httpBackend.flush();
        });

        describe('with no parent', function () {
            var $scope = {
                categoryForm: {}
            };
            var controller;

            beforeEach(function () {
                controllerParams.$scope = $scope;
                controller = $controller('category-modal-controller', controllerParams);
                
                $httpBackend.whenGET('/api/cmn/category/test_guid/').respond(200, { category: category });
                $httpBackend.flush();
            });

            it('should be an edit mode', function () {
                expect($scope.isEditMode).toBe(true);
            });

            it('should be an initialized category object', function () {
                expect($scope.category).toEqual(category);
            });
            
            it('should be $CategoryService edit method called with correct data', function () {
                $httpBackend.whenPUT('/api/cmn/category/').respond(201, {});
            
                $scope.category.name = 'test_edited';
            
                $scope.manageCategory();
                $httpBackend.flush();
                expect($CategoryService.edit).toHaveBeenCalledWith({ name: 'test_edited', guid: category.guid, parent_guid: undefined })
            });
            
            it('should be Category.editSuccess event to be broadcasted', function () {
                $httpBackend.whenPUT('/api/cmn/category/').respond(201, {});
            
                $scope.category.name = 'test_edited';
            
                $scope.manageCategory();
                $httpBackend.flush();
                expect($rootScope.$broadcast).toHaveBeenCalled();
            });
            
            it('should be modal instance to be closed', function () {
                $httpBackend.whenPUT('/api/cmn/category/').respond(201, {});
            
                $scope.category.name = 'test_edited';
            
                $scope.manageCategory();
                $httpBackend.flush();
                expect(uibModalInstance.close).toHaveBeenCalled();
            });
            
            it('should be an manageCategory response error', function () {
                $httpBackend.whenPUT('/api/cmn/category/').respond(500, {});
            
                spyOn($validator, 'validateFormResponse').and.throwError('validation error');
            
                $scope.category.name = 'test_edited';
            
                $scope.manageCategory();
                $httpBackend.flush();
                expect($ToastrService.messageFromResponse).toHaveBeenCalled();
            })
        });

        describe('with parent', function () {
            var $scope = {
                categoryForm: {}
            };
            var controller;
            var parentGuid = 'parent_guid';
        
            beforeEach(function () {
                controllerParams.$scope = $scope;
                controllerParams.$stateParams.guid = parentGuid;
                controller = $controller('category-modal-controller', controllerParams);
                
                $httpBackend.whenGET('/api/cmn/category/test_guid/').respond(200, { category: category });
                $httpBackend.flush();
            });
        
            it('should be a edit mode', function () {
                expect($scope.isEditMode).toBe(true);
            });
        
            it('should be an initialized category object', function () {
                expect($scope.category).toEqual(category);
            });
        
            it('should be $CategoryService edit method called with correct data', function () {
                $httpBackend.whenPUT('/api/cmn/category/').respond(201, {});
        
                $scope.category.name = 'test';
        
                $scope.manageCategory();
                $httpBackend.flush();
                expect($CategoryService.edit).toHaveBeenCalledWith({ name: 'test', guid: category.guid, parent_guid: parentGuid })
            });
        });

        describe('errors', function () {
            var $scope = {
                categoryForm: {}
            };
            var controller;

            beforeEach(function () {
                controllerParams.$scope = $scope;
                controller = $controller('category-modal-controller', controllerParams);
                
                $httpBackend.whenGET('/api/cmn/category/test_guid/').respond(500, {});
                $httpBackend.flush();
            });

            it('should be an error getting category', function () {
                expect($ToastrService.messageFromResponse).toHaveBeenCalled();
            })
        })
    });
});