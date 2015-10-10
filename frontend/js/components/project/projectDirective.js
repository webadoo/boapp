var app = angular.module('boapp');

app.directive('projectBox', ['ProjectModalService', 'ProjectService', function(ProjectModalService, ProjectService) {
	var controller = function($scope) {
		var self = this;
		
		function init() {
			self.project = angular.copy(self.project);
		};
		
		init();
		
		self.editProject = function() {
			ProjectModalService.editProject(self.project);
		};
		
		self.deleteProject = function() {
			ProjectModalService.deleteProject(self.project);
		};
	};
	
	return {
		restrict: 'EA',
		scope: {
			project: '='
		},
		replace: true,
		templateUrl: 'views/projectbox.html',
		controller: controller,
		controllerAs: 'vm',
		bindToController: true
	};
}]);