'use strict';

angular.module('ps2map').directive('mpMarker', function() {
	return {
		require: '^^mpMap',
		restrict: 'E',
		scope: {
			lat: '&',
			lng: '&',
			onMove: '&',
			onClick: '&',
		},
		bindToController: true,
		controllerAs: 'marker',
		controller: [ '$scope' ,function( $scope ){
			console.log('marker controller');
			$scope.self = this;
		} ],
		link: function(scope, element, attr, ctrl) {
			console.log('marker');
			var self = scope.self;
			// console.log('('+scope.lng()+', ' + scope.lng() +')');
			self.marker = L.marker( [ self.lat(), self.lng() ], {
				draggable: true
			});
			ctrl.addLayer( self.marker );
	
			// leafletのイベント変数を利用可能
			self.marker.on( 'move', function( evt ) {
				if( self.onMove ){
					self.onMove( { 'event': evt } );
				}
			});
	
			self.marker.on( 'click', function( evt ) {
				if( self.onClick ){
					self.onClick( { 'event': evt } );
				}
			});
			
			element.on( '$destroy', function() {
				ctrl.removeLayer( self.marker );
			});
		},
	};
});


