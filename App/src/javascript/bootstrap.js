require.config({
    map: {
        '*': {
            'ie8css': 'libs/ie8css.min.js',
            'css': 'libs/css.1.0.0.min.js'
        }
    },
    waitSeconds: 0,
    //配置angular的路径
    paths: {
        'angular': 'libs/angular',
        'angular-ui-router': 'libs/angular-ui-router.min',
        'angular-async-loader': 'libs/angular-async-loader.min',
        'commonControl': 'libs/my-common',
        'angular-ui-tree': 'libs/angular-ui-tree.min',
        'jquery': 'libs/jquery.min',
        'webuploader': 'libs/webuploader.min',
        'angular-datepicker': 'libs/datepicker-branch-seagull2.min'
    },
    //这个配置是你在引入依赖的时候的包名
    shim: {
        'text': { exports: 'text' },
        'angular': { exports: 'angular' },
        'angular-ui-router': { deps: ['angular'] },
        'angular-ui-tree': { deps: ['angular', 'css!libs/angular-ui-tree.min'] },
        'commonControl': { deps: ['angular', 'angular-ui-tree'] },
        'angular-datepicker': { deps: ['angular', 'css!libs/datepicker'] }
    }
});

require(['angular', 'webuploader', 'jquery',
    'javascript/app-routes'],
    function (angular, webuploader, jquery) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
            angular.element(document).find('html').addClass('ng-app');
        });
        window.WebUploader = webuploader;
        window.jquery = jquery;
});