'use strict';

(function(){

var module = angular.module('map2App');

module.component('map', {
	templateUrl: 'app/map/map.html',
	controllerAs: '$mapCtrl',
	controller: function(){
		this.markers = [ { lat: -10, lng: 10 }, { lat: -30, lng: 20}, { lat: -50, lng: 50} ];
		
		this.onClickMarker = function( event ){
			console.log("you clicked marker at (" + event.latlng.lat + ", " + event.latlng.lng + ")" );
		};
		this.onClickMap = function( event ){
			console.log("you clicked map at (" + event.latlng.lat + ", " + event.latlng.lng + ")" );
		};
	},
});

})();


