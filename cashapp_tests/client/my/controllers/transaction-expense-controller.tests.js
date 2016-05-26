describe('TransactionExpense tests', function () {
    var $controller;
    var $httpBackend;
    var $ToastrService;
    
    function TransactionExpenseItem(count, price) {
        this.count = count;
        this.price = price;
    }
        
    TransactionExpenseItem.prototype = {
        constructor: TransactionExpenseItem,
        
        getSum: function () {
            return this.count * this.price;
        }
    };

    
    beforeEach(module('CashAppMy'));

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$ToastrService_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $ToastrService = _$ToastrService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Transaction expense errors', function () {
        var $scope;
        var controller;
    
        beforeEach(function () {
            $scope = {};
            controller = $controller('transaction-expense-controller', {
                $scope: $scope
            });
            
            spyOn($ToastrService, 'messageFromResponse');
    
            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.whenGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/my/po/').respond(200, {});
            $httpBackend.whenGET('/my/po/details/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/po//').respond(500, { types: [{ name: 'card'}, { name: 'cash'}]});
            
            $httpBackend.flush();
        });
    
        it('should be an gettin data error', function () {
            expect($ToastrService.messageFromResponse).toHaveBeenCalled();
        });
    });

    describe('Transaction expense.', function () {
        var $scope;
        var controller;

        beforeEach(function () {
            var guid = '42';
            $scope = {
                transactionForm: {name: ''}
            };
            controller = $controller('transaction-expense-controller', {
                $scope: $scope,
                $stateParams: { guid: guid }
            });
            
            spyOn($ToastrService, 'messageFromResponse');
            spyOn($ToastrService, 'info');
            spyOn($ToastrService, 'error');

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/my/uiview/').respond(200, {});
            $httpBackend.expectGET('/my/dashboard/').respond(200, {});
            $httpBackend.whenGET('/my/po/').respond(200, {});
            $httpBackend.whenGET('/my/po/details/').respond(200, {});
            $httpBackend.whenGET('/api/cmn/po/' + guid + '/').respond(200, { po: {name: 'test', guid: guid}});

            $httpBackend.flush();
        });

        it('should be inited $scope.po', function () {
            expect($scope.po.name).toBe('test');
            expect($scope.po.guid).toBe('42');
        });

        it('should be inited $scope.transaction', function () {
            expect($scope.transaction.expense_items.length).toBe(0);
            expect($scope.transaction.payment_object.name).toBe('test');
        });

        it('should be loadSuppliers success result', function () {
            var value = 'query';
            $httpBackend.whenGET('/api/cmn/search/?type=supplier&q=' + value).respond(200, { instances: [{ name: 'test_supplier' }]});

            var response = $scope.loadSuppliers(value);
            $httpBackend.flush();
        });

        it('should be loadSuppliers error result', function () {
            var value = 'query';
            $httpBackend.whenGET('/api/cmn/search/?type=supplier&q=' + value).respond(500, {});

            var response = $scope.loadSuppliers(value);
            
            $httpBackend.flush();
            expect($ToastrService.messageFromResponse).toHaveBeenCalled();
        });

        it('should be loadExpenseItems success result', function () {
            var value = 'query';
            $httpBackend.whenGET('/api/cmn/search/?type=expenseitem&q=' + value).respond(200, { instances: [{ name: 'test_expense_item' }]});

            var response = $scope.loadExpenseItems(value);
            $httpBackend.flush();
        });

        it('should be loadExpenseItems error result', function () {
            var value = 'query';
            $httpBackend.whenGET('/api/cmn/search/?type=expenseitem&q=' + value).respond(500, {});

            var response = $scope.loadExpenseItems(value);

            $httpBackend.flush();
            expect($ToastrService.messageFromResponse).toHaveBeenCalled();
        });

        it('should be onNewExpenseItemSelect item has been already added', function () {
            var item =  { guid: 'test', name: 'test' };
            $scope.transaction.expense_items = [item];

            $scope.onNewExpenseItemSelect(item);
            expect($ToastrService.info).toHaveBeenCalledWith('item_has_been_already_added');
        });

        it('should be onNewExpenseItemSelect $scope.newExpenseItem to be cleared', function () {
            $httpBackend.whenGET('/api/cmn/expenseitem/test_01/register/?last=true').respond(200, { register: { value: 1 }});
            
            $scope.onNewExpenseItemSelect({ guid: 'test_01', name: 'test_01', category: { name: 'test_cat' }});
            expect($scope.newExpenseItem).toBe('');
            
            $httpBackend.flush();
        });
        
        it('should be onNewExpenseItemSelect added item to expense_items', function () {
            $httpBackend.whenGET('/api/cmn/expenseitem/test_02/register/?last=true').respond(200, { register: { value: 50 }});

            var count = $scope.transaction.expense_items.length;
            $scope.onNewExpenseItemSelect({ guid: 'test_02', name: 'test_02', category: { name: 'test_cat' }});
            expect($scope.transaction.expense_items.length).toBe(count + 1);

            $httpBackend.flush();
        });
        
        it('should be onNewExpenseItemSelect on get last register error', function () {
            $httpBackend.whenGET('/api/cmn/expenseitem/test_03/register/?last=true').respond(500, {});

            $scope.onNewExpenseItemSelect({ guid: 'test_03', name: 'test_03', category: { name: 'test_cat' }});
            $httpBackend.flush();
            
            expect($ToastrService.messageFromResponse).toHaveBeenCalled();
        });

        it('should be onNewExpenseItemSelect inited item price', function () {
            $httpBackend.whenGET('/api/cmn/expenseitem/test_04/register/?last=true').respond(200, { register: { value: 50 }});

            $scope.onNewExpenseItemSelect({ guid: 'test_04', name: 'test_04', category: { name: 'test_cat' }});
            $httpBackend.flush();
            
            expect($scope.transaction.expense_items[$scope.transaction.expense_items.length - 1].price).toBe(50);
        });

        it('should be getTransactionSum valid sum', function () {
            $scope.transaction.expense_items = [
                new TransactionExpenseItem(2, 50),
                new TransactionExpenseItem(1, 17),
                new TransactionExpenseItem(0.4, 20)
            ];

            var sum = $scope.getTransactionSum();
            expect(sum).toBe(2 * 50 + 1. * 17 + 0.4 * 20);
        });

        it('should be removed item from expense_items', function () {
            $scope.transaction.expense_items = [
                { guid: 'test_01' },
                { guid: 'test_02' }
            ];

            var count = $scope.transaction.expense_items.length;
            
            $scope.removeTransactionExpenseItem ('test_01');
            expect($scope.transaction.expense_items.length).toBe(count - 1);
            expect($scope.transaction.expense_items[0].guid).toBe('test_02');
        });
        
        it('should be error during removed item from expense_items', function () {
            $scope.transaction.expense_items = [
                { guid: 'test_01' },
                { guid: 'test_02' }
            ];

            var count = $scope.transaction.expense_items.length;
            
            $scope.removeTransactionExpenseItem ('test_03');
            expect($ToastrService.error).toHaveBeenCalled();
        });

    });
});
