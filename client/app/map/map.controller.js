'use strict';

(function(){

class MapCtrl {
	constructor( $scope, mpConfig, mpCortiumService){
		MapCtrl.$inject = ['$scope', 'mpConfig', 'mpCortiumService'];
		// DI
		this.scope = $scope;
		this.config = mpConfig;
		this.cortiumService = mpCortiumService;
		
		// property
		this.selectedCortium = undefined;
		this.cortiums = [];
		this.selectedContinentId = 0;
		this.tileApi = undefined;
		this.continents = this.config.continents;
		this.urlTemplate = this.config.templateUrl( this.selectedContinentId );
		
		console.log('construct map ctrl');
		console.log(this.onClickMap);
	}
	
	update() {
		this.cortiums = [];
		this.cortiumService.getCortiums( this.selectedContinentId )
		.then( ( res ) => {
			for( var i=0; i < res.data.length; i++ ) {
				this.cortiums.push( { lat: 256*res.data[i].lat, lng: 256*res.data[i].lng } );
			}
		}, ( res ) => {
			// 見つからない場合
		});
	}
	onClickMarker( event ) {
	};
	//-----------------------------------------------------------------------------------------
	onClickMap( event ){
		// console.log('map clicked');
		this.cortiumService.putCortium( {
			continent: this.selectedContinentId, 
			lat: event.latlng.lat / 256,
			lng: event.latlng.lng / 256,
			grade: 1,
		});
	}
	//-----------------------------------------------------------------------------------------
	registerTileApi( api ){
		this.tileApi = api;
		// console.log('api registered');
	}
	//-----------------------------------------------------------------------------------------
	changeContinent( continentId ){
		this.selectedContinentId = continentId;
		this.update();
		this.urlTemplate = this.config.templateUrl( this.selectedContinentId );
		this.tileApi.rebuildTile();
	}
	//-----------------------------------------------------------------------------------------
}

angular.module('map2App')
.component('map', {
	templateUrl: 'app/map/map.html',
	controller: MapCtrl,
	controllerAs: '$mapCtrl',
});

})();


