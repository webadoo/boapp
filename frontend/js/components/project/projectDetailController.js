var app = angular.module('boapp');

app.controller('ProjectDetailController', ['$scope', '$modal', 'ProjectService', 'ProjectWorkHourService', 'ProjectArticleService', function($scope, $modal, ProjectService, ProjectWorkHourService, ProjectArticleService) {
	var self = this;
	self.vm = {
		projectId: ''
	};
	
	$scope.data = {
		project: {},
		workHours: {},
		articles: {}
	};
	
	function getProject() {
		var where = { deleted: false, objectId: self.vm.projectId };
		
		ProjectService.show({ where: where }).$promise.then(function(result) {
			$scope.data.project = result.results;
		});
	};
	
	getProject();
}]);
