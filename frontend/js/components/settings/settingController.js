var app = angular.module('boapp');

app.controller('SettingsController', ['$scope', 'SettingsService', 'SettingService', 'SettingsSharedDataService', function($scope, SettingsService, SettingService, SettingsSharedDataService) {
	
	$scope.data = SettingsSharedDataService;
	
	this.getSettings = function() {
		console.log('SettingsController.getSettings()');
		SettingsService.query().$promise.then(function(result) {
			SettingsSharedDataService.settings = result.results;
		});
	};
	
	this.getSettings();
	
	this.saveSettings = function() {
		console.log('SettingsController.saveSettings()');
		for (var i = 0; i < $scope.data.settings.length; i++) { 
    		console.log('Save setting ' + $scope.data.settings[i].friendlyName + " with value: " + $scope.data.settings[i].settingValue);
			SettingService.update($scope.data.settings[i]);
		}
	};
	
}]);