var myapp = angular.module("myapp",["ngRoute"]);
myapp.config(function($routeProvider) {
    $routeProvider
    .when("/uploadFiles", {
        templateUrl : "fileupload.html"
    })
    .when("/listFiles", {
        templateUrl : "viewUpload.html"
    })
    .otherwise({
        templateUrl : "fileupload.html"
    });
});

myapp.directive('uploadFiles', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function($scope, element, attrs) {
                  var model = $parse(attrs.uploadFiles);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     $scope.$apply(function(){
                        modelSetter($scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);

myapp.controller("viewFiles",['$scope','$http',function($scope,$http){
	
		$scope.fileList ="http://52.26.127.158/myphp/listFiles.php";
		$http.get($scope.fileList).then(function(info){
				
			$scope.allFiles = info.data;
		
		});

}])

myapp.service("uploadService",["$http",function($http){

         this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);
            
              return $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
			}
         }]);



         
myapp.controller("fileUpload",['$scope','uploadService',function($scope,uploadService){
            $scope.uploadFiles = function(){
               var file = $scope.UploadFile;
               var uploadUrl = "http://52.26.127.158/myphp/uploadFiles.php";
               var uploaderInfo = uploadService.uploadFileToUrl(file, uploadUrl);
			   uploaderInfo.then(function(info){
					$scope.uploadMessage = info.data;
					
			   });
			   uploaderInfo.error(function(){
					$scope.uploadMessage = "Error in uploading file.";
					
			   });
			   
				
			};
         }]);