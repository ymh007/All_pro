define(function (require) {
    var app = require('javascript/app');
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		
        $stateProvider.state('view1', {
            url: '/view1',
            templateUrl: 'views/v1/v1.html',
            controller: 'v1-controller',
            controllerUrl: 'javascript/controllers/v1/v1-controller.js'
        });
		
		$stateProvider.state('view2', {
            url: '/view2',
            templateUrl: 'views/v2/v2.html',
            controller: 'v2-controller',
            controllerUrl: 'javascript/controllers/v2/v2-controller.js'
        });
        $stateProvider.state('corep', {
            url: '/corep',
            templateUrl: 'views/coreApp/corepage.html',
            controller: 'coreApp-controller',
            controllerUrl: 'javascript/controllers/coreApp/coreController.js'
        });
    }]);
});