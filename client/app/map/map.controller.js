'use strict';


(function(){

class MapComponent {
  constructor() {
  }
}

angular.module('map2App')
.component('map', {
    templateUrl: 'app/map/map.html',
    controller: MapComponent
  });

var app = angular.module('map2App');

app.constant('ps2map.constant', {
	tileUrlTemplate: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/{c}/{z}/{y}/{x}.jpg',
	continentUrl: [ 'indar', 'amerish', 'esamir', 'hossin' ],
});


app.directive('ps2mapRoot', function(){
	return {
		restrict : 'E',
		transclude: true,
		template: '<div style="width:100vw; height:100vh; background:#AABBCC;"><ng-transclude></div>',
		scope: {},
		bindToController: true,
		controllerAs: 'mapRootCtrl',
		controller: [ '$scope', function( $scope ){
			this.addMarker = function( marker ){
				marker.addTo( $scope.map );
			};
		}],
	    compile: function compile( element, attr, transclude) {
			return {
				pre: function preLink( scope, element, attr, controller) {
					// 子要素のlinkが行われる前にmapを用意しておき、子要素からマーカの追加を行うため、preを使っている
					// http://qiita.com/armorik83/items/38fe685cc76163c7e8ce 
					// https://docs.angularjs.org/api/ng/service/$compile
					// console.log("map root pre");
					scope.map = L.map( element[0].children[0], { crs: L.CRS.Simple } );
					scope.tile = L.tileLayer( 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg', {
						tileSize: 256,
						continuousWorld: true, // バグ対策 :  https://github.com/Leaflet/Leaflet/issues/2776
						attributionControl: false,
						attribution: 'test',
						zoomReverse: true,
						minZoom: 0,
						maxZoom: 4,
						noWrap: true,
					});
			    	scope.tile.addTo( scope.map );
			    	scope.map.fitBounds([ [0, 0], [0, 512], [-512, 512], [-512, 0] ]);
				},
				post: function postLink( scope, element, attr, controller) {
					// console.log("map root post");
				},
			};
	    },
	};
});

app.directive('ps2mapMarker', function(){
	return {
		require: '^^ps2mapRoot',
		restrict: 'E',
		scope: {
			lat: "@",
			lng: "@",
		},
	    link: function( scope, element, attr, ctrl) {
			// console.log("map marker post");
			scope.marker = L.marker( [ scope.lat, scope.lng ], { draggable: true } );
			ctrl.addMarker( scope.marker );
			
			scope.marker.on('move', function(evt){
				// 課題 : 通知する手段がない。インターフェースを作るべき?
				console.log(evt);
				this.lat = evt.latlng.lat;
				this.lng = evt.latlng.lng;
			});
	    },
	};
});

app.controller('testCtrl', function(){
	this.markers = [ { lat: -10, lng: 10 }, { lat: -30, lng: 20}, { lat: -50, lng: 50} ];
});

})();


