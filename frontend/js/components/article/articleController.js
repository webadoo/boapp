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
       
       	 modalInstance.result.then(function(article) {          
          	ArticlesService.create(article);
			ArticlesSharedDataService.add(article);		 
       	 });
	 }
}]);


app.controller('AddArticleModalInstanceController', function($modalInstance) {
	var self = this;
	self.vm = {
		title: "Artikel toevoegen",
		article: { deleted: false }
	}
	
	self.ok = function() {
		$modalInstance.close(self.vm.article);
	}
	
	self.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});

app.controller('EditArticleModalInstanceController', function($modalInstance, article) {
	var self = this;
	self.vm = {
		title: "Artikel aanpassen",
		article: article
	}
	
	self.ok = function() {
		console.log('EditArticleModalInstanceController.ok()');
		$modalInstance.close(self.vm.article);
	};
	
	self.cancel = function() {
		console.log('EditArticleModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});

app.controller('DeleteArticleModalInstanceController', function($modalInstance, article) {
	var self = this;
	self.vm = {
		title: "Artikel verwijderen",
		article: article
	}
	
	self.ok = function() {
		console.log('DeleteArticleModalInstanceController.ok()');
		$modalInstance.close(self.vm.article);
	}
	
	self.cancel = function() {
		console.log('DeleteArticleModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});