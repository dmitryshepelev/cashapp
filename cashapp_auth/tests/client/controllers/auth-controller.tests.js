describe('SignInController tests', function () {
    var $controller, createValidatorService;

    createValidatorService = function () {
        return {
            validateForm: function () {
                return true;
            }
        }
    };

    beforeEach(module('CashAppAuth'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('signin-controller', { $scope: $scope, $validator: createValidatorService() });
        });

        it('should be defaulted loginModel', function () {
            expect($scope.loginModel.data).toEqual({ username: '', password: '' })
        });

        it('should be signin result true', function () {
            $scope.loginModel.form = {};
            var result = $scope.loginModel.signin();
            expect(result).toBe(undefined);
        })
    })
});