/**
 * INSPINIA - Responsive Admin Theme
 *
 */
var app = angular.module('inspinia');

app.controller('MainController', function() {
   this.userName = 'Bart Ongena' 
});

/**
 * CustomersController
 */
app.controller('CustomersController', function($scope, $modal, CustomersService, CustomerService) {

   $scope.search = { 
       name: '' 
   };
   
   $scope.getCustomers = function() {	       
	 	 CustomersService.query({ where: $scope.where, order: 'name' }).$promise.then(function(result) {
			console.log(result);  
			$scope.customers = result.results;
            console.log($scope.customers);
	  });		 		 
   };      
   
   $scope.addCustomer = function() {
       var modalInstance = $modal.open({
          templateUrl: 'views/modal_customer.html',
          controller: AddCustomerModalInstanceController,
          scope: $scope    
       });
       
       modalInstance.result.then(function(customer) {
          console.log(customer);
          CustomersService.create(customer); 
       });     
   };
   
   $scope.editCustomer = function(customer) {
       var modalInstance = $modal.open({
          templateUrl: 'views/modal_customer.html',
          controller: EditCustomerModalInstanceController,
          resolve: {
              customer: function() {
                return customer;  
              } 
          }   
       });
       
       modalInstance.result.then(function(customer) {
          CustomerService.update(customer); 
       });     
   };
});

function AddCustomerModalInstanceController ($scope, $modalInstance) {
    $scope.title = "Klant toevoegen";
    $scope.customer = {};
    $scope.ok = function () {
        $modalInstance.close($scope.customer);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function EditCustomerModalInstanceController ($scope, $modalInstance, customer) {
    $scope.title = "Klant aanpassen";
    $scope.customer = customer;
    $scope.ok = function () {
        $modalInstance.close($scope.customer);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


/**
 * Articles
 */
app.controller('ArticlesController', function($scope, $modal, ArticlesService, ArticleService) {

   $scope.search = "";
  
   $scope.getArticles = function() {	
       console.log('Search: ' + $scope.search.name);
	 	 ArticlesService.query({ order: 'name' }).$promise.then(function(result) {
			$scope.articles = result.results;
            console.log($scope.articles);
	  });		 		 
   };      
   
   $scope.addArticle = function() {
       var modalInstance = $modal.open({
          templateUrl: 'views/modal_article.html',
          controller: AddArticleModalInstanceController,
          scope: $scope    
       });
       
       modalInstance.result.then(function(article) {
          console.log(article);
          ArticlesService.create(article); 
       });     
   };
   
   $scope.editArticle = function(article) {
       var modalInstance = $modal.open({
          templateUrl: 'views/modal_article.html',
          controller: EditArticleModalInstanceController,
          resolve: {
              article: function() {
                return article;  
              } 
          }   
       });
       
       modalInstance.result.then(function(article) {
          ArticleService.update(article); 
       });     
   };
});

function AddArticleModalInstanceController ($scope, $modalInstance) {
    $scope.title = "Artikel toevoegen";
    $scope.article = {};
    $scope.ok = function () {
        $modalInstance.close($scope.article);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function EditArticleModalInstanceController ($scope, $modalInstance, article) {
    $scope.title = "Artikel aanpassen";
    $scope.article = article;
    $scope.ok = function () {
        $modalInstance.close($scope.article);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


/**
 * Einde Articles
 */
 
 
 /**
  * Projects
  */
 app.controller('ProjectsController', function($scope, $modal, ProjectsService, ProjectService) {

  // $scope.search = "";
  
   $scope.getProjects = function() {	
       //console.log('Search: ' + $scope.search.name);
	 	 ProjectsService.query({ order: 'name' }).$promise.then(function(result) {
			$scope.projects = result.results;
            console.log($scope.projects);
	  });		 		 
   };      
   
   $scope.addProject = function() {
       var modalInstance = $modal.open({
          templateUrl: 'views/modal_project.html',
          controller: AddProjectModalInstanceController,
          scope: $scope    
       });
       
       modalInstance.result.then(function(project) {
          console.log(project);
          ProjectsService.create(project); 
       });     
   };
   
   $scope.editProject = function(project) {
       alert('edit project');
   };
});

function AddProjectModalInstanceController ($scope, $modalInstance, ProjectsService) {
    $scope.title = "Project toevoegen";
    $scope.project = {};
    $scope.ok = function () {
        $modalInstance.close($scope.project);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    
    ProjectsService.query({ order: 'name' }).$promise.then(function(result) {
	   $scope.statusses = result.results;
	});		 		 
}

/**
 * End Projects
 */