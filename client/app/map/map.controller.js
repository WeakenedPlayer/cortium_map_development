'use strict';

(function(){

class MapCtrl {
	constructor( $scope, mpConfig, mpCortiumService){
		// console.log('MapCtrl class constructor');
		// DI
		MapCtrl.$inject = ['$scope', 'mpConfig', 'mpCortiumService'];
		this.scope = $scope;
		this.config = mpConfig;
		this.cortiumService = mpCortiumService;
		
		// property
		this.selectedCortium = undefined;
		this.cortiums = [];
		this.selectedContinentId = 0;
		this.tileApi = undefined;
		this.continents = this.config.continents;
		this.templateUrl = this.config.templateUrl( this.selectedContinentId );
	}
	
	update() {
		this.cortiums = [];
		this.cortiumService.getCortiums( this.selectedContinentId )
		.then( ( res ) => {
			for( var i=0; i < res.data.length; i++ ) {
				// 暫定
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
		// 暫定
		this.cortiumService.putCortium( {
			continent: this.selectedContinentId, 
			lat: event.latlng.lat / 256,
			lng: event.latlng.lng / 256,
			grade: 1,
		});
	}
	//-----------------------------------------------------------------------------------------
	registerTileApi( api ){
		// console.log('api registered');
		this.tileApi = api;
	}
	//-----------------------------------------------------------------------------------------
	changeContinent( continentId ){
		this.selectedContinentId = continentId;
		this.update();
		this.templateUrl = this.config.templateUrl( this.selectedContinentId );
		this.tileApi.update();
	}
	//-----------------------------------------------------------------------------------------
}

// コンポーネント(ディレクティブの簡易版)の登録とコントローラの割り当て
angular.module('map2App')
.component('map', {
	templateUrl: 'app/map/map.html',
	controller: MapCtrl,
	controllerAs: '$mapCtrl',
});

})();


