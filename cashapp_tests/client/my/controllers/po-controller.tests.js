describe('POController tests', function () {
    var $controller;
    var $httpBackend;
    var $ToastrService;
    var $rootScope;
    var $state;

    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$ToastrService_, _$rootScope_, _$state_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $ToastrService = _$ToastrService_;
        $rootScope = _$rootScope_;
        $state = _$state_;
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

            spyOn($ToastrService, 'messageFromResponse');
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/currency/').respond(200, { currencies: [{ code: 'USD' }, { code: 'BYR' }]});
            $httpBackend.whenGET('/api/cmn/po/').respond(500, {});

            $httpBackend.flush();
        });
    
        it('should be an gettin data error', function () {
            expect($ToastrService.messageFromResponse).toHaveBeenCalled();
        });
    });

    describe('PO Controller', function () {
        var $scope;
        var controller;
        var $event = {
            stopImmediatePropagation: function () {
            }
        };

        beforeEach(function () {
            $scope = {};
            controller = $controller('po-controller', {
                $scope: $scope
            });

            spyOn($ToastrService, 'error');
            spyOn($state, 'go');
            
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
            $scope.pos.manage($event);

            expect($ToastrService.error).toHaveBeenCalled();
        });

        it('should be a transfer to manage po modal success', function () {
            var guid = 'test_guid';
            $scope.pos.manage($event, guid);

            expect($state.go).toHaveBeenCalledWith('my.po.action', { action: 'edit', guid: guid });
        });

        it('should be an error goint to po details', function () {
            $scope.pos.details($event);

            expect($ToastrService.error).toHaveBeenCalled();
        });

        it('should be a going to po details success', function () {
            var guid = 'test_guid';
            $scope.pos.details($event, guid);

            expect($state.go).toHaveBeenCalledWith('my.po.details', { guid: guid });
        });
    });

    describe('$rootScope events', function () {
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

        it('should be PO.addSuccess event handled', function () {
            var poCount = $scope.pos.data.length;

            var newPO = { name: 'new_po' };
            $rootScope.$broadcast('PO.addSuccess', newPO);

            expect($scope.pos.data.length).toBe(poCount + 1);
        });

        it('should be PO.addSuccess event handled with empty subs', function () {
            $scope.pos.data = null;

            var newPO = { name: 'new_po' };
            $rootScope.$broadcast('PO.addSuccess', newPO);

            expect($scope.pos.data.length).toBe(1);
        });

        it('should be PO.editSuccess event handled', function () {
            $scope.pos = {
                getIndexByGuid: function () {
                    return 0;
                },
                data: [{
                    name: 'test',
                    guid: 'test_guid'
                }]
            };

            var editedPO = {};
            angular.copy($scope.pos.data[0], editedPO);
            editedPO.name = 'new_name';

            expect($scope.pos.data[0].name != editedPO.name).toBe(true);

            $rootScope.$broadcast('PO.editSuccess', editedPO);

            expect($scope.pos.data[0].name).toBe(editedPO.name);
        });

        it('should be PO.editSuccess event handled error', function () {
            $scope.pos = {
                getIndexByGuid: function () {
                    return -1;
                },
                data: [{
                    name: 'test',
                    guid: 'test_guid'
                }]
            };

            var editedPO = {};
            angular.copy($scope.pos.data[0], editedPO);
            editedPO.name = 'new_name';

            expect($scope.pos.data[0].name != editedPO.name).toBe(true);

            function broadcast() {
                $rootScope.$broadcast('PO.editSuccess', editedPO)
            }

            expect(broadcast).toThrow(new Error('Invalid instance was edited'))
        });
    });
});