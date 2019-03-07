define(function (require) {
	var app = require('javascript/app');

	app.controller('v2-controller', [
		'$scope', '$http', 'wfWaiting',
		function ($scope, $http, wfWaiting) {
			//wfWaiting.hide();
			//angular.extend($scope, viewData);
			$scope.demoData = "现在时间：" + new Date();
			$scope.title = '点击展开';
			$scope.text = '这里是内部的内容。';
			$scope.comurl="http://localhost:10000/MyApi/";
			$scope.my_opts = { 
				max: 999
			}
			//http://localhost:10000/MyApi/PageingProInfo?serachStr=ymh&page=1
			$scope.test=function(){
				$http.get($scope.comurl+"PageingProInfo?serachStr=ymh&page=1").success(function(data){
					 $scope.datalist=data;
				});
			}
			$scope.test();
		}]);
});

