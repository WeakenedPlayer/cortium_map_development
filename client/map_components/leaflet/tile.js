'use strict';

PS2MAP.directive('mpTile', function() {
	return {
	    require: '^^mpMap',
		restrict: 'E',
		transclude: true,
		scope: {
			urlTemplate: '&',
			tileSize: '&',
			rebuild: '&',
			registerApi: '&',
		},
		bindToController: true,
		controllerAs: 'tileCtrl',
		//-----------------------------------------------------------------------------------------
		controller: ['$scope', function($scope) {
			// console.log('tile controller');
			$scope.self = this;
			var self = $scope.self;
			// rebuild tile layer with new parameter
			self.api = {
				rebuildTile : function(){
					// remove existing tile layer from map
					if( self.tile ){
						self.mapCtrl.removeLayer( self.tile );
					}
					console.log(self.urlTemplate());
					self.tile = L.tileLayer( self.urlTemplate(), {
						tileSize: self.tileSize(),
						continuousWorld: true, // バグ対策 :  https://github.com/Leaflet/Leaflet/issues/2776
						minZoom: 1,
						maxZoom: 7,
						maxNativeZoom: 5,
						noWrap: true,		
					});
					self.mapCtrl.addLayer( self.tile );
				},
			};
			
		}],
		//-----------------------------------------------------------------------------------------
		link: function( scope, elem, attr, ctrl) {
			console.log('tile post link');
			var self = scope.self;
			self.mapElement = elem;
			self.mapCtrl = ctrl;
			self.api.rebuildTile();
			console.log('api register');
			self.registerApi( { 'api': self.api } );
		},
	};
});



