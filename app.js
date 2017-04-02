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

myApp.directive('uploadFiles', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.uploadFiles);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);

myapp.controller("viewFiles",['$scope','listFiles',function(scope,listFiles){
	
		scope.fileList ="/getFiles";
		scope.allFiles = listFiles.ListFiles();

}])

myapp.service("uploadService",["$https:",function($https:){

         this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);
            
              return $https:.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
			}
         }]);
})

myapp.service("listFiles",function(){
	
			this.ListFiles = function(){
			return 	$https:.get(fileList)		
			}
			
})

         
myapp.controller("fileUpload",['$scope','uploadService',function(scope,uploadService){
            $scope.uploadFiles = function(){
               var file = $scope.UploadFile;
               var uploadUrl = "/fileUpload";
               var uploaderInfo = fileUpload.uploadFileToUrl(file, uploadUrl);
			   uploaderInfo.success(function(){
					scope.uploadMessage = "Uploaded Successfully.";
					
			   });
			   uploaderInfo.error(function(){
					scope.uploadMessage = "Error in uploading file.";
					
			   });
			   
				
			   })
            };
         }]);