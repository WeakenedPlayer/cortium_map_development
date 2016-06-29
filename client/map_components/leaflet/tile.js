'use strict';

class MpTileCtrl {
	static ddo(){
		console.log( 'tile.ddo' );
		return {
		    require: '^^mpMap',
			restrict: 'E',
			transclude: true,
			scope: {
				templateUrl: '&',
				tileSize: '&',
				rebuild: '&',
				registerApi: '&',
			},
			bindToController: true,
			controllerAs: 'mpTileCtrl',
			controller: MpTileCtrl,
			link: MpTileCtrl.link, 
		};
	}
	
	static link( scope, elem, attr, ctrl) {
		console.log('tile.postLink');
		var self = scope.self;
		self.mapElement = elem;
		self.mapCtrl = ctrl;
		self.update();
		self.registerApi( { 'api': self.api } );
	}
	
	constructor( $scope ){
		MpTileCtrl.$inject = ['$scope'];
		$scope.self = this;
		this.mapElement = undefined;
		this.mapCtrl = undefined;
		this.tile = undefined;
		this.api = {
			update: ()=>{ this.update(); },	// bind "this" to mpTileCtrl
		};
	}
	
	update(){
		// remove existing tile layer from map
		if( this.tile ){
			this.mapCtrl.removeLayer( this.tile );
		}
		// console.log(this.templateUrl);
		this.tile = L.tileLayer( this.templateUrl(), {
			tileSize: this.tileSize(),
			continuousWorld: true, // バグ対策 :  https://github.com/Leaflet/Leaflet/issues/2776
			minZoom: 1,
			maxZoom: 7,
			maxNativeZoom: 5,
			noWrap: true,		
		});
		this.mapCtrl.addLayer( this.tile );
	}
}

PS2MAP.directive('mpTile', MpTileCtrl.ddo);
