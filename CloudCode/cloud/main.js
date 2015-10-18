
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello Ad!");
});

Parse.Cloud.define('sumOfProjectWorkHours', function(request, response) {
  var totalHours = 0;

  var projectWorkHourQuery = new Parse.Query("WorkingHour");
  projectWorkHourQuery.equalTo("projectId", {
    __type: "Pointer",
    className: "Project",
    objectId: request.params.projectId
  });
  projectWorkHourQuery.each(
      function(result){
          totalHours += result.get("timeWorked");
      }, {
          success: function() {
              response.success("Totaal gewerkte uren: " + totalHours);
          },
          error: function(error) {
              response.success("mislukt: " + error.message);
          }
   });
});


Parse.Cloud.define("getProjects", function(request, response) {
    var projects = [];
    var q = new Parse.Query('Project');
    q.each(function(project) {
        var promise = Parse.Promise.as();
        
        var workingHoursList = [];
        promise = promise.then(function() {
            var w = new Parse.Query('ProjectWorkingHour');
            w.equalTo('project', project);
            
            return w.each(function(workingHour) {
                //workingHoursList.push(JSON.stringify(workingHour));
                workingHoursList.push(workingHour.toJSON());
            });
        }).then(function() {
            project.set('workingHours', workingHoursList);
            //projects.push(JSON.stringify(project));
            projects.push(project.toJSON());
        });
        return promise;
    }).then(function() {
        // var resultsJson = [];
        // for (var i = 0; i<projects.length; i++) {
        //   var resultJson = (projects[i].toJSON());
        //  
        //   resultsJson.push(resultJson);
        // }
        response.success(projects);
        //response.success(resultsJson);
    });
});