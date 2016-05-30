describe('CategoryController tests', function () {
    var $controller;
    var $httpBackend;
    var $state;
    var $ToastService;
    var $rootScope;
    var $event = {
        stopImmediatePropagation: function () {}
    };

    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$state_, _$ToastrService_, _$rootScope_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        $ToastService = _$ToastrService_;
        $rootScope = _$rootScope_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Global error', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('category-controller', {
                $scope: $scope,
                $stateParams: {
                    guid: ''
                }
            });

            spyOn($ToastService, 'messageFromResponse');

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/category/?subs=true&parent=true').respond(500, {});

            $httpBackend.flush();
        });

        it('should be error getting data', function () {
            expect($ToastService.messageFromResponse).toHaveBeenCalled();
        });
    });

    describe('Root category', function () {
        var $scope;
        var controller;
    
        beforeEach(function () {
            $scope = {};
            controller = $controller('category-controller', {
                $scope: $scope,
                $stateParams: {
                    guid: ''
                }
            });

            spyOn($state, 'go');
            spyOn($ToastService, 'error');
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/category/?subs=true&parent=true').respond(200, { category: { subs: []}});
            
            $httpBackend.flush();
        });
    
        it('should be isRoot flag true', function () {
            expect($scope.isRoot).toBe(true);
        });
        
        it('should be initial category model', function () {
            expect($scope.category.subs.length).toBe(0);
        });

        it('should be root transaition', function () {
            $scope.up(true);

            expect($state.go).toHaveBeenCalledWith('my.category', {}, { reload: true });
        });

        it('should be manage add modal call', function () {
            $scope.manage($event);

            expect($state.go).toHaveBeenCalledWith('my.category.action', { action: 'add' });
        });

        it('should be edit manage modal call', function () {
            var guid = 'test_guid';
            $scope.manage($event, guid);

            expect($state.go).toHaveBeenCalledWith('my.category.action', { action: 'edit', subguid: guid });
        });

        it('should be an error on details transition', function () {
            $scope.details($event);

            expect($ToastService.error).toHaveBeenCalled();
        });

        it('should be an details transition', function () {
            var guid = 'test_guid';
            $scope.details($event, guid);

            expect($state.go).toHaveBeenCalledWith('my.category.details', { guid: guid });
        })
    });

        describe('Delete category', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('category-controller', {
                $scope: $scope,
                $stateParams: {
                    guid: ''
                }
            });

            spyOn($state, 'go');
            spyOn($ToastService, 'error');
            spyOn($ToastService, 'messageFromResponse');

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/category/?subs=true&parent=true').respond(200, { category: { subs: [{guid: 'test_guid'}]}});

            $httpBackend.flush();
        });

        it('should be successful deleted category', function () {
            $httpBackend.whenDELETE('/api/cmn/category/test_guid/').respond(200, { category: 'test_guid'});

            var categoriesCount = $scope.category.subs.length;
            $scope.delete($event, 'test_guid');
            
            $httpBackend.flush();
            expect($scope.category.subs.length).toBe(categoriesCount - 1);
        });

        it('should be an error during successful callback executing', function () {
            $httpBackend.whenDELETE('/api/cmn/category/test_guid/').respond(200, { category: 'other_test_guid'});
            
            $scope.delete($event, 'test_guid');
            
            $httpBackend.flush();            
        });

        it('should be an error during deleting', function () {
            $httpBackend.whenDELETE('/api/cmn/category/test_guid/').respond(500, {});

            $scope.delete($event, 'test_guid');

            $httpBackend.flush();
            expect($ToastService.messageFromResponse).toHaveBeenCalled();
        })
    });

    describe('Non root category', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('category-controller', {
                $scope: $scope,
                $stateParams: {
                    guid: 'test_guid'
                }
            });

            spyOn($state, 'go');
            spyOn($ToastService, 'error');

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/category/test_guid/?subs=true&parent=true').respond(200, { category: { name: 'test', guid: 'test_guid', subs: []}});

            $httpBackend.flush();
        });

        it('should be isRoot flag false', function () {
            expect($scope.isRoot).toBe(false);
        });

        it('should be initial category model', function () {
            expect($scope.category.name).toBe('test');
        });

        it('should be root transaition', function () {
            $scope.up(true);

            expect($state.go).toHaveBeenCalledWith('my.category', {}, { reload: true });
        });
        
        it('should be manage add modal call', function () {
            $scope.manage($event);

            expect($state.go).toHaveBeenCalledWith('my.category.details.action', { action: 'add' });
        });

        it('should be parent transaition', function () {
            $scope.category.parent_guid = 'patent_guid';
            $scope.up();

            expect($state.go).toHaveBeenCalledWith('my.category.details', { guid: $scope.category.parent_guid }, { reload: true });
        });

        it('should be parent transaition to root', function () {
            $scope.category.parent_guid = 'patent_guid';
            $scope.up(true);

            expect($state.go).toHaveBeenCalledWith('my.category', {}, { reload: true });
        });

        it('should be edit manage modal details call', function () {
            var guid = 'test_guid';
            $scope.manage($event, guid);

            expect($state.go).toHaveBeenCalledWith('my.category.details.action', { action: 'edit', subguid: guid })
        });

        it('should be an error on details transition', function () {
            $scope.details($event);

            expect($ToastService.error).toHaveBeenCalled();
        });
    });

    describe('$rootScope events', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('category-controller', {
                $scope: $scope,
                $stateParams: {
                    guid: ''
                }
            });

            spyOn($ToastService, 'messageFromResponse');

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/category/?subs=true&parent=true').respond(200, { category: { subs: []}});

            $httpBackend.flush();
        });

        it('should be Category.addSuccess event handled', function () {
            var categoriesCount = $scope.category.subs.length;

            var newCategory = { name: 'new_category' };
            $rootScope.$broadcast('Category.addSuccess', newCategory);

            expect($scope.category.subs.length).toBe(categoriesCount + 1);
        });
        
        it('should be Category.addSuccess event handled with empty subs', function () {
            $scope.category.subs = null;

            var newCategory = { name: 'new_category' };
            $rootScope.$broadcast('Category.addSuccess', newCategory);

            expect($scope.category.subs.length).toBe(1);
        });

        it('should be Category.editSuccess event handled', function () {
            $scope.category = {
                subs: [{
                    name: 'test',
                    guid: 'test_guid'
                }]
            };

            var editedCategory = {};
            angular.copy($scope.category.subs[0], editedCategory);
            editedCategory.name = 'new_name';

            expect($scope.category.subs[0].name != editedCategory.name).toBe(true);

            $rootScope.$broadcast('Category.editSuccess', editedCategory);

            expect($scope.category.subs[0].name).toBe(editedCategory.name);
        });
    });
});