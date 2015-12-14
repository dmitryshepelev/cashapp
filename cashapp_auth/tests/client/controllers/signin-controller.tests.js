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

        it('should be defaulted signinModel', function () {
            expect($scope.signinModel.data).toEqual({ username: '', password: '' })
        });

        it('should be signin result true', function () {
            $scope.signinModel.form = {};
            var result = $scope.signinModel.signin();
            expect(result).toBe(undefined);
        });
    })
});