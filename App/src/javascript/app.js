define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');
    require('angular-ui-router');
    require('angular-datepicker');
	require('commonControl');
    var app = angular.module('app', [ 'ui.router','common-config','commonControl','angular-datepicker']);
    var commonConfig = require('libs/text.js!common-config.json');
    var config = require('libs/text.js!config.json');
    app.config(['configureProvider', function (configureProvider) {
         configureProvider.configure(commonConfig);
         configureProvider.configure(config);
    }]);
    //搜索provider
    $customCommonProvider = function () {
        this.$get = ['configure', function (configure) {
            var my = {}; 
            my.initScope = function ($scope) {
                var config = {};
                config = configure.getConfig(config, 'customerConfig');
                $scope.relativeLinks = config.relativeLinks;
            }
            return my;
        }];
    };
    app.provider("customCommonProvider", $customCommonProvider)
    asyncLoader.configure(app);
    module.exports = app;
});