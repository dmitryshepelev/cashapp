describe('SignUpController tests', function () {
    var $controller, $httpBackend, createValidatorService, $RedirectService;

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

    $RedirectService = {
        redirectToUrl: function () {
            return true
        },
        getRedirectUrl: function () {
            return '/some/url/'
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

    describe('signupModel', function () {
        var $scope, controller, newUser, url;

        beforeEach(function () {
            $scope = {};
            controller = $controller('signup-controller', { $scope: $scope, $validator: createValidatorService(), $RedirectService: $RedirectService });

            newUser = { username: 'test', email: 'test@dog.cat', password: 'qwertyz', confirmed_password: 'qwertyz', redirect_url: '' };
            url = '/auth/api/signup/';

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.flush();
        });

        it('should be a default signupModel', function () {
            expect($scope.signupModel.data).toEqual({ username: '', email: '', password: '', confirm_password: '', redirect_url: '/some/url/' })
        });

        it('should be successful signing up with valid redirect url', function () {
            $scope.signupModel.data = { username: 'test', email: 'test@dog.cat', password: 'qwertyz', confirmed_password: 'qwertyz', redirect_url: '' };

            $httpBackend.whenPOST(url).respond(200, { data: { redirect_url: 'url' }});
            $httpBackend.expectPOST(url, newUser);

            expect($scope.signupModel.signup()).toEqual(undefined);

            $httpBackend.flush()
        });

        it('should be successful signing up with invalid redirect url', function () {
            $scope.signupModel.data = { username: 'test', email: 'test@dog.cat', password: 'qwertyz', confirmed_password: 'qwertyz', redirect_url: '' };

            $httpBackend.whenPOST(url).respond(200, { data: {}});
            $httpBackend.expectPOST(url, newUser);

            expect($scope.signupModel.signup()).toEqual(undefined);

            $httpBackend.flush()
        });

        it('should be an internal server error during signing up', function () {
            $scope.signupModel.data = { username: 'test', email: 'test@dog.cat', password: 'qwertyz', confirmed_password: 'qwertyz', redirect_url: '' };

            $httpBackend.whenPOST(url).respond(500, { data: {}});
            $httpBackend.expectPOST(url, newUser);

            expect($scope.signupModel.signup()).toEqual(undefined);

            $httpBackend.flush()
        });

        it('should be an data server error during signing up', function () {
            $scope.signupModel.data = { username: 'test', email: 'test@dog.cat', password: 'qwertyz', confirmed_password: 'qwertyz', redirect_url: '' };

            $httpBackend.whenPOST(url).respond(400, { data: { password: ['Password is invalid'] }});
            $httpBackend.expectPOST(url, newUser);

            expect($scope.signupModel.signup()).toEqual(undefined);

            $httpBackend.flush()
        })
    })
});
