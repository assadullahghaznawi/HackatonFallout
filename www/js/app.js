// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('aanvragen', function($scope)
{
	var aanvragen = [];
	var bestaatAanvraag = false; // in AP kan een student maar één keer aanvragen voor een herexamens, dus als de naam van de student in aanvraag lijst voorkomt, wordt zijn aanvraag geweigerd
	$scope.aanvragen = function(naam, datum, reden)
	{
		for (i = 0; i < aanvragen.length; i++) {
			if(aanvragen[i].naam == naam)
			{
				bestaatAanvraag = true;
			}
		}
		if(!bestaatAanvraag){
			var myObj = new Object();
			myObj.naam = naam;
			myObj.datum = datum;
			myObj.reden = reden;
			aanvragen.push(myObj);
			window.localStorage['post'] = JSON.stringify(aanvragen);
		}
	}
}
)

.controller('TodoCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.tasks = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Open our new task modal
  $scope.newTask = function() {
	var post = JSON.parse(window.localStorage['post'] || '{}');
	//lijst sorteren volgens datum ascending
	post.sort(compare);
	$scope.items = post;
    $scope.taskModal.show();
  };
  //fucntie voor datum sortering
  function compare(a,b) {
  if (a.datum < b.datum)
	return -1;
  if (a.datum > b.datum)
	return 1;
  return 0;
 };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
});