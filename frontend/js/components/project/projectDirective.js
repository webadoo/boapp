var app = angular.module('boapp');

app.directive('projectBox', ['$modal', 'ProjectModalService', 'ProjectService', function(modal, ProjectModalService, ProjectService) {
	var controller = function($scope) {
		var self = this;
		
		function init() {
			console.log('projectbox.init() ' + self.project);
			self.project = angular.copy(self.project);
		};
		
		init();
		
		self.editProject = function() {
			console.log('projectBox.editProject: ' + self.project);
			ProjectModalService.editProject(self.project);
		};
		
		self.deleteProject = function() {
			console.log('projectBox.deleteProject: ' + self.project.title);
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