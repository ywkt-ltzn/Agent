var app = angular.module("myApp",["ngRoute"]);

app.config(function($routeProvider) {
     
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/home", {
        templateUrl : "home.html"
    })
    .when("/support", {
        templateUrl : "support.html"
    })
    .when("/create", {
        templateUrl : "create.html"
    })
 });

app.run(['$rootScope', '$location' , '$window' , 'Auth',  function ($rootScope, $location, $window, Auth) {
    //$rootScope.useremail = "test_user";
    

    $rootScope.$on('$routeChangeStart', function (event) {
    	console.log('In rout change start')
        Auth.isLoggedIn().then(function(data){
        	console.log(data);
            if (!data ) {
               	console.log('DENY');
                $location.path('/');
                //$('#usernav').hide();
                document.getElementById('usernav').style.display='none';
			}
            else {                    
                console.log('ALLOW');
                $rootScope.useremail = Auth.getuser();
                //$('#usernav').show();
                document.getElementById('usernav').style.display='';
                document.getElementById('myTopnav').style.display='none';
					/*$('#divlogin').hide();
					$('#divuser').show();
					$('#divlogout').show();
                    $('#navlogin').hide();
					$('#userdropdown').show();*/
						
			}
        }); 
    });
}]);

app.factory('Auth', function($http,$q){
	var useremail;

	return{
	    setUser : function(user_email){
	    	
	    	useremail = user_email;
	    	console.log('here is setuser' + useremail);
	    	//---------session set here------------
	    	return $http.get('sessionset.php?email=' + user_email).then(function(result) {       
            	console.log(result.data);
            	return result.data; 
        	});

        },
	    getuser : function(){
	    	console.log ('it in getuser function' + useremail);
	        return useremail;
	    },
	    logout : function(){

	    	//-----------session destroy here---------
	        return $http.get('sessiondestroy.php').then(function(result) { 
	            console.log("session destroy" + result.data);
	            return result.data; 
	        });
	    },
	    isLoggedIn : function(){
        	var deferred = $q.defer();
			console.log("it's log in");

			//---------session check here-------------------
        	deferred.resolve(
				$http.get('sessioncheck.php').then(function(result) {      
            	var response = result.data;
            	console.log(result.data);
					if(response.status == 'success'){
						useremail = response.uemail;
						return true;
					}
					else{
						return false;
					}
            
				})
            );
	        return deferred.promise;
	        
    	}
  	}
});


app.controller('loginCtrl', function($rootScope,$scope,Auth, $http, $location,$window){
	
	$scope.loginFunction = function() {
        console.log("user/login.php?e="+ $scope.email +"&p=" +$scope.password );

        //---------------send request to backend API for login info-----------------
        /*$http({
		method : "GET",
		url : mainurl + "user/login.php?e="+ $scope.email +"&p=" +$scope.password 
			}).success(function(data, status, header, config) {
            $scope.message = status + data.status + '-' + data.message;
			 if (data.id == null){
					  var errmsg = document.getElementById('message');
                      errmsg.innerHTML = "<b>" + "Somethings Wrong!" + "</b>"
					  errmsg.style.display = '';
				  }
				  else{
                      console.log(data.name);
                      console.log(data.id);
                      Auth.setUser(data.name,data.id,data.role,data.role_name,data.email);
                      $location.path('/');
				  }
			}).error ( function (data, status, header, config) {
            $scope.message = status + data;
		});*/

		Auth.setUser($scope.email);
        $location.path('/create');
    }
})
.controller('logoutCtrl', function($rootScope,$scope,Auth, $http, $location,$window){
	$scope.logoutFunction = function() {
    	console.log ('here logout');
    	Auth.logout();
        $location.path('/');
        $window.location.reload();
    }    
});