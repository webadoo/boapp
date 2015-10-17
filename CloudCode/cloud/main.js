
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