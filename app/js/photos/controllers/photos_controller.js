var angular = require('angular');

module.exports = function(app) {
  app.controller('PhotosController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    //These are recycled lines from Tyler
      //$scope.greeting = 'hello world';
      //$scope.fakePhoto={name: 'a fake photo', fishPreference: 'suffering'};
      //cfStore.set('greeting', 'hello world');
    $scope.photos = [];
    var photoService = Resource('/photos');

    $scope.toggleEdit = function(photo) {
      if (photo.backup) {
        var temp = photo.backup;
        $scope.photos.splice($scope.photos.indexOf(photo), 1, temp);
      } else {
        photo.backup = angular.copy(photo);
        photo.editing = true;
      }
    };

    $scope.getAll = function() {
      photoService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.photos = res;
      });
    };

    $scope.createPhoto = function(photo) {
      $scope.photos.push(photo);
      photoService.create(photo, function(err, res) {
        if (err) return console.log(err);
        $scope.photos.splice($scope.photos.indexOf(photo), 1, res);
        $scope.newPhoto = null;
      });
    };

    $scope.deletePhoto = function(photo) {
      if (!photo._id) return setTimeout(function() {$scope.deletePhoto(photo);}, 1000);
      photoService.delete(photo, function(err, res) {
        if (err) return console.log(err);
        $scope.photos.splice($scope.photos.indexOf(photo), 1);
      });
    };

    $scope.updatePhoto = function(photo) {
      photoService.update(photo, function(err, res) {
        photo.editing = false;
        photo.backup = null;
        if (err) return console.log(err);
      });
    };
  }]);
};
