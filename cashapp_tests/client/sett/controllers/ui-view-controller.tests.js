describe('UIViewController tests', function () {
    var $controller;
    var $httpBackend;
    var $rootScope;
    var $state;

    beforeEach(module('CashAppSett'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Scope tests', function () {
        var $scope;
        var controller;

        var tabs = [
            { active: false, toState: 'sett.general', heading: 'general_title', show: false },
            { active: false, toState: 'sett.po', heading: 'po_title', show: false }
        ];

        beforeEach(function () {
            $scope = {};
            controller = $controller('$UiViewController', {
                $scope: $scope
            });

            $httpBackend.expectGET('/static/locale/en.json').respond(200, {});
            $httpBackend.expectGET('/sett/uiview/').respond(200, 'some html');
            $httpBackend.whenGET('/sett/general/').respond(200, 'general html');
            $httpBackend.whenGET('/sett/po/').respond(200, 'po html');
        });
    })
});