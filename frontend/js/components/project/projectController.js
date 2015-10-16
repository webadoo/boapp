var app = angular.module('boapp');

app.controller('ProjectsController', ['$scope', '$modal', 'ProjectsService', 'ProjectsSharedDataService', function($scope, $modal, ProjectsService, ProjectsSharedDataService) {
	this.vm = {
		search: ''
	};
	
	$scope.data = ProjectsSharedDataService;
	
	this.getProjects = function() {
		console.log('ProjectsController.getProjects()');
		var where = { deleted: false };
		
		if (this.vm.search) {
			where.title = this.vm.search;
			console.log('Project search: ' + this.vm.search);
		};
		ProjectsService.query({ where: where }).$promise.then(function(result) {
			ProjectsSharedDataService.projects = result.results;
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
			ProjectsService.create(project);
			ProjectsSharedDataService.add(project);
		});
	}
}]);

app.controller('AddProjectModalInstanceController', ['$scope', '$modalInstance', 'CustomersSharedDataService', function($scope, $modalInstance, CustomersSharedDataService) {
	var self = this;
	self.vm = {
		title: 'Project toevoegen',
		project: { deleted: false }
	};
	
	$scope.data = {
		customers: [],
		selectedCustomerId: 0
	}
	
	var promise = new Promise(function(resolve, reject) {
		// do a thing, possibly async, then…
	   	var ok = CustomersSharedDataService.getCustomers({ deleted: false });
		
		if (ok) {
			resolve("Stuff worked!");
		}
		else {
			reject(Error("It broke"));
		}
	});
	
	function init() {
		//CustomersSharedDataService.getCustomers({ deleted: false });
		//$scope.data.customers = CustomersSharedDataService.customers;
		promise.then(function(result) {
			$scope.data.customers = CustomersSharedDataService.customers;
			console.log(result); // "Stuff worked!"
		}, function(err) {
			console.log(err); // Error: "It broke"
		});
	}

	init();
	
	
	
	
	
	self.ok = function() {
		console.log('selected customerId: ' + $scope.data.selectedCustomerId);
		$modalInstance.close(self.vm.project);
	};
	
	self.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);

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
	console.log('DeleteProjectModalInstanceController: ' + project.title);
	var self = this;
	self.vm = {
		title: 'Project verwijderen',
		project: project	
	}
	
	self.ok = function() {
		console.log('DeleteProjectModalInstanceController.ok()');
		$modalInstance.close(self.vm.project);
	}
	
	self.cancel = function() {
		console.log('DeleteProjectModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});