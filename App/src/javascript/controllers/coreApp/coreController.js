define(function (require) {
    var app = require('javascript/app');

    app.controller('coreApp-controller', [
        '$scope', '$http', 'wfWaiting',
        function ($scope, $http, wfWaiting) {
            //wfWaiting.hide();
            //angular.extend($scope, viewData);
            $scope.demoData = "现在时间：" + new Date();
            $scope.title = '点击展开';
            $scope.text = '这里是内部的内容。';
            $scope.comurl = "http://localhost:10000/MyApi/Test";
            $scope.getFiles = function () {
                $http.get($scope.comurl).success(function (data) {
                    $scope.files = data;
                });

            };
             
        }]);
     
});

