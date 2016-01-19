describe('SignInController tests', function () {
    var $controller, $httpBackend, createValidatorService, $window;

    createValidatorService = function () {
        return {
            validateForm: function () {
                return { status: true, elements: [] };
            },
            showErrors: function () {
                return undefined;
            }
        }
    };

    $window = {
        location: {
            href: ''
        }
    };

    beforeEach(module('CashAppAuth'));

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('signinModel', function () {
        var $scope, controller, user, url;

        beforeEach(function () {
            $scope = {};
            controller = $controller('signin-controller', { $scope: $scope, $validator: createValidatorService(),  $window: $window });

            user = { username: 'test', password: '123456' };
            url = '/auth/api/signin/';

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.flush();
        });

        it('should be default signinModel', function () {
            expect($scope.signinModel.data).toEqual({ username: '', password: '' })
        });

        it('should be successful signing in with valid redirect url', function () {
            $scope.signinModel.data = { username: 'test', password: '123456' };

            $httpBackend.whenPOST(url).respond(200, { data: { redirect_url: 'url' }});
            $httpBackend.expectPOST(url, user);

            expect($scope.signinModel.signin()).toEqual(undefined);

            $httpBackend.flush()
        });

        it('should be successful signing in with invalid redirect url', function () {
            $scope.signinModel.data = { username: 'test', password: '123456' };

            $httpBackend.whenPOST(url).respond(200, { data: {}});
            $httpBackend.expectPOST(url, user);

            expect($scope.signinModel.signin()).toEqual(undefined);

            $httpBackend.flush()
        });

        it('should be internal server error during signing in', function () {
            $scope.signinModel.data = { username: 'test', password: '123456' };

            $httpBackend.whenPOST(url).respond(500, { data: {}});
            $httpBackend.expectPOST(url, user);

            expect($scope.signinModel.signin()).toEqual(undefined);

            $httpBackend.flush()
        });

        it('should be data server error during signing in', function () {
            $scope.signinModel.data = { username: 'test', password: '123456' };

            $httpBackend.whenPOST(url).respond(400, { data: { password: ['Password is invalid'] }});
            $httpBackend.expectPOST(url, user);

            expect($scope.signinModel.signin()).toEqual(undefined);

            $httpBackend.flush()
        });
    })
});