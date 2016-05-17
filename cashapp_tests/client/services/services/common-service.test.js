describe('$CommonService tests', function () {
    var $CommonService;

    beforeEach(module('CashApp.Service'));

    beforeEach(inject(function (_$CommonService_) {
        $CommonService = _$CommonService_;
    }));

    describe('encodeQueryData function', function () {
        beforeEach(function () {

        });

        it('should be TypeError exception with Array arg', function () {
            var data = [];
            
            expect($CommonService.encodeQueryData.bind(this, data))
                .toThrow(new TypeError('The parameter \'data\' is not an object'))
        });

        it('should be TypeError exception with null arg', function () {
            var data = null;

            expect($CommonService.encodeQueryData.bind(this, data))
                .toThrow(new TypeError('The parameter \'data\' is not an object'))
        });
        
        it('should be TypeError exception with undefined arg', function () {
            expect($CommonService.encodeQueryData)
                .toThrow(new TypeError('The parameter \'data\' is not an object'))
        });
        
        it('should be TypeError exception with Number arg', function () {
            var data = 3;

            expect($CommonService.encodeQueryData.bind(this, data))
                .toThrow(new TypeError('The parameter \'data\' is not an object'))
        });

        it('should be query data string from one-key object', function () {
            var data = {
                testKey: 'testValue'
            };

            expect($CommonService.encodeQueryData(data))
                .toBe('testKey=testValue')
        });
        
        it('should be query data string from more than one-key object', function () {
            var data = {
                testKey1: 'testValue1',
                testKey2: 'testValue2'
            };

            expect($CommonService.encodeQueryData(data))
                .toBe('testKey1=testValue1&testKey2=testValue2')
        });
    });

    describe('createFlatCopy function', function () {
        beforeEach(function () {

        });

        it('should be a copy from flat obj', function () {
            var obj = {
                testKey: 'testValue'
            };
            var copy = $CommonService.createFlatCopy(obj); 
            
            expect(obj.testKey).toBe(copy.testKey);
        });

        it('should be a copy from nested obj', function () {
            var obj = {
                testKey: 'testValue',
                nested: {
                    nestedKey: 'nestedValue',
                    guid: 'testGuid'
                }
            };
            var copy = $CommonService.createFlatCopy(obj);
            
            expect(obj.nested.guid).toBe(copy.nested_id);
        });
            
        it('should be deleted nested key in copy obj', function () {
            var obj = {
                testKey: 'testValue',
                nested: {
                    nestedKey: 'nestedValue',
                    guid: 'testGuid'
                }
            };
            var copy = $CommonService.createFlatCopy(obj);
            
            expect(copy.nested).toBe(undefined);
        });
    });
});
