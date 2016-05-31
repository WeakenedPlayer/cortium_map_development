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
app.directive('mapRoot', function(){
	return {
		restrict : 'E',
		transclude: true,
		template: '<div style="width:100vw; height:100vh; background:#AABBCC;"><ng-transclude></div>',
		scope: {},
		bindToController: true,
		controllerAs: 'mapRootCtrl',
		controller: [ '$scope', function( $scope ){
			// http://qiita.com/armorik83/items/38fe685cc76163c7e8ce 
			// Controllerが先に実行されるので、地図の操作はすぐには行えない
			this.markers = [];
			this.addMarker = function( marker ){
				this.markers.push( marker );
			};
		}],

		link: function( scope, element, attr ){
			scope.map = L.map( element[0].children[0], { crs: L.CRS.Simple } );
			scope.tile = L.tileLayer( 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg', {
				tileSize: 256,
				continuousWorld: true, // バグ対策 :  https://github.com/Leaflet/Leaflet/issues/2776
				attributionControl: false,
				attribution: 'Indar',
				zoomReverse: true,
				minZoom: 0,
				maxZoom: 4,
				noWrap: true,
		    });
	    	scope.tile.addTo( scope.map );
	    	scope.map.fitBounds([ [0, 0], [0, 512], [-512, 512], [-512, 0] ]);
	    },
	};
});
app.directive('mapMarker', function(){
	return {
		require: '^^mapRoot',
		restrict : 'E',
		template:"<div></div>",
	    link: function( scope, element, attr, ctrl) {
	    	scope.marker = L.marker([-10,10]); 
			// Controllerが先に実行されるので、まだ地図ができていない(DOM操作がまだ)
	    	ctrl.addMarker( scope.marker );
	    },
	};
});
})();


