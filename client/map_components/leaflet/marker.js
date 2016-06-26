'use strict';

class MpMarkerCtrl {
	constructor( $scope ){
		console.log('marker.constructor');
		// DI
		MpMarkerCtrl.$inject = ['$scope'];
		
		// link
		$scope.self = this;

		this.marker = L.marker( [ this.lat(), this.lng() ], {
			draggable: true
		});
		// leafletのイベント変数を利用可能
		this.marker.on( 'move', function( evt ) {
			if( this.onMove ){
				this.onMove( { 'event': evt } );
			}
		});

		this.marker.on( 'click', function( evt ) {
			if( this.onClick ){
				this.onClick( { 'event': evt } );
			}
		});
	}
	// --------------------------------------------------------------------------------------------
	// directive definition
	// --------------------------------------------------------------------------------------------
	static ddo(){
		console.log('marker.ddo');
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
			controller: MpMarkerCtrl,
			compile: () => {
				return {
					pre: undefined,
					post: MpMarkerCtrl.postLink,
				};
			}
		};
	}
	static postLink( scope, element, attr, ctrl ) {
		console.log( 'marker.postLink' );
		ctrl.addLayer( scope.self.marker );
		element.on( '$destroy', function() {
			ctrl.removeLayer( scope.self.marker );
		});
	}
}

PS2MAP.directive('mpMarker', MpMarkerCtrl.ddo);
