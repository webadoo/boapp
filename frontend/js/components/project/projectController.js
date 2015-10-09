var app = angular.module('boapp');

app.controller('ProjectsController', ['$scope', '$modal', 'ProjectService', 'ProjectSharedDataService'], function($scope, $modal, ProjectService, ProjectSharedDataService) {
	this.vm = {
		search: ''
	};
	
	$scope.data = ProjectSharedDataService;
	
	this.getProjects = function() {
		console.log('ProjectsController.getProjects()');
		var where = { deleted: false };
		
		if (this.vm.search) {
			where.name = this.vm.search;
		};
		ProjectService.query({ where: where }).$promise.then(function(result) {
			ProjectSharedDataService.projects = result.results;
		});
	};
	
	this.getProjects();
	
	this.addProject = function() {
		console.log('projectController.addProject()');
		var modalInstance = $modal.open({
			templateUrl: 'views/modal_project.html',
			controller: 'AddProjectModalInstanceController as modal'
		});
		
		modalInstance.result.then(function(project) {
			ProjectService.create(project);
			ProjectSharedDataService.add(project);
		});
	}
});

app.controller('AddProjectModalInstanceController', function($modalInstance) {
	var self = this;
	self.vm = {
		title: 'Project toevoegen',
		project: { deleted: false }
	};
	
	self.ok = function() {
		$modalInstance.close(self.vm.project);
	};
	
	self.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});

app.controller('EditProjectModalInstanceController', function($modalInstance, project) {
	var self = this;
	self.vm = {
		title: 'Project aanpassen',
		project: project
	};
	
	self.ok = function() {
		$modalInstance.close(self.vm.project);
	};
	
	self.cancel = function() {
		$modalInstance.dismiss('cancel');	
	};
});

app.controller('DeleteProjectModalInstanceController', function($modalInstance, project) {
	var self = this;
	self.vm = {
		title: 'Project verwijderen',
		project: project	
	};
	
	self.ok = function() {
		$modalInstance.close(self.vm.project);
	};
	
	self.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});