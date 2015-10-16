var app = angular.module('boapp');


app.controller('ArticlesController', ['$scope', '$modal', 'ArticlesService', 'ArticleService', 'ArticlesSharedDataService', function($scope, $modal, ArticlesService, ArticleService, ArticlesSharedDataService) {
	 this.vm = {
	 	search: ''
	 };
	 
	 $scope.data = ArticlesSharedDataService;

	 this.getArticles = function() {
		var where = { deleted: false };
		if (this.vm.search) { 
			where.name = this.vm.search; 
			console.log(where);
		};
		ArticlesService.query({ where: where, order: 'name' }).$promise.then(function(result) {
			ArticlesSharedDataService.customers = result.results;
		});
	 };
	 
	 this.getArticles();
	 
	 this.addArticle = function() {
		 var modalInstance = $modal.open({
          	templateUrl: 'views/modal_article.html',
          	controller: 'AddArticleModalInstanceController as modal'
       	 });
       
       	 modalInstance.result.then(function(customer) {
          	console.log(customer);
          	CustomersService.create(customer);
			CustomersSharedDataService.add(customer);		 
       	 });
	 }
}]);


app.controller('AddCustomerModalInstanceController', function($modalInstance) {
	var self = this;
	self.vm = {
		title: "Klant toevoegen",
		customer: { deleted: false }
	}
	
	self.ok = function() {
		console.log('AddCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	}
	
	self.cancel = function() {
		console.log('AddCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	};
});

app.controller('EditCustomerModalInstanceController', function($modalInstance, customer) {
	var self = this;
	self.vm = {
		title: "Klant aanpassen",
		customer: customer
	}
	
	self.ok = function() {
		console.log('EditCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	};
	
	self.cancel = function() {
		console.log('EditCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});

app.controller('DeleteCustomerModalInstanceController', function($modalInstance, customer) {
	var self = this;
	self.vm = {
		title: "Klant verwijderen",
		customer: customer
	}
	
	self.ok = function() {
		console.log('DeleteCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	}
	
	self.cancel = function() {
		console.log('DeleteCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});