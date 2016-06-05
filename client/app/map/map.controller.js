'use strict';


(function(){

class MapComponent {
  constructor() {
  }
}

var module = angular.module('map2App');

module.component('map', {
	templateUrl: 'app/map/map.html',
	controller: MapComponent,
	controllerAs: 'mapCtrl',
});


module.controller('testController', ['$scope', function($scope){
	this.markers = [ { lat: -10, lng: 10 }, { lat: -30, lng: 20}, { lat: -50, lng: 50} ];
	this.onclick = function( evt ){
		console.log(evt);
	};
	this.onmove = function( marker, evt ){
		marker.lat = evt.latlng.lat;
		marker.lng = evt.latlng.lng;
		$scope.$apply();
	};
}]);


})();


