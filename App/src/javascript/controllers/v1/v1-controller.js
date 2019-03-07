define(function (require) {
	var app = require('javascript/app');

	app.controller('v1-controller', [
		'$scope', '$http', 'wfWaiting',
		function ($scope, $http, wfWaiting) {
			//wfWaiting.hide();
			//angular.extend($scope, viewData);
			$scope.demoData = "现在时间：" + new Date();
			$scope.title = '点击展开';
			$scope.text = '这里是内部的内容。';
			$scope.comurl="http://localhost:10000/MyApi/Test";
			$scope.getFiles=function(){
				$http.get($scope.comurl).success(function(data){
					 $scope.files=data;
				});

			}

			$scope.uploadFile=function(){

				  
   
			}
			$scope.getFiles();
		}]);

		
	app.directive('expander', function () {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				title: '=expanderTitle'
			},
			template: '<div>'
			+ '<div class="title" ng-click="toggle()">{{title}}</div>'
			+ '<div class="body" ng-show="showMe" ng-transclude></div>'
			+ '</div>',
			link: function (scope, element, attrs) {
				scope.showMe = false;
				scope.toggle = function toggle() {
					scope.showMe = !scope.showMe;
				}
			}
		}
	});


	$LoadBaseDataServiceProvider = function () {
		this.$get = ['seagull2Url', '$http', function (seagull2Url, $http) {
			var my = {};
			my.provideDesc = function () {
				//return $http.get(seagull2Url.getPlatformUrlBase() + '/BaseData/GetBusinessModelList');
				return "这是注入的 provide";
			}
			return my;
		}];

	};
	app.provider("loadBaseDataService", $LoadBaseDataServiceProvider)
});

