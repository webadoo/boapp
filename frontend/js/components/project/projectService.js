var app = angular.module('boapp');

app.factory('ProjectsSharedDataService', function () {
	var theData = {
		projects: [],
		add: add,
		remove: remove
	};
	
	function add(project) {
		console.log('ProjectsSharedDataService.add()');
		theData.projects.push(project);
	}
	
	function remove(project) {
		console.log('ProjectsSharedDataService.remove()');
		theData.projects = _.reject(theData.projects, function(p) { return p.objectId === project.objectId });
	}
	
	return theData;
});


app.factory('ProjectsService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Project', {}, {
        query: { 
			method: 'GET', 
			isArray: false,
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
        create: { 
			method: 'POST',
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
    })
});

app.factory('ProjectService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Project/:id', {}, {
		show: { 
			method: 'GET',						
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
		update: {
			method: 'PUT',
			params: { id: '@objectId' },
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
		delete: {
			method: 'DELETE',
			params: { id: '@objectId' },
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		}
	})
});

app.factory('ProjectModalService', ['$modal', 'ProjectService', 'ProjectsSharedDataService', function($modal, ProjectService, ProjectsSharedDataService) {
	return {
		editProject: function(project) {
			console.log(project);
			var modalInstance = $modal.open({
				templateUrl: 'views/modal_project.html',
				controller: 'EditProjectModalInstanceController as modal',
				resolve: {
					project: function() {
						return project;
					}
				}
			});	
			
			modalInstance.result.then(function(project) {
				ProjectService.update(project);
			});
		},
		
		deleteProject: function(project) {
			console.log('ProjectModalService ' + project.title);
			var modalInstance = $modal.open({
				templateUrl: 'js/components/project/deleteProjectView.html',
				controller: 'DeleteProjectModalInstanceController as modal',
				resolve: {
					project: function() {
						console.log('ProjectModalService.resolve() ' + project);
						return project;
					}
				}
			});
			
			modalInstance.result.then(function(project) {
				project.deleted = true;
				ProjectService.update(project);
				ProjectsSharedDataService.remove(project);
			});
		}
	}
}]);