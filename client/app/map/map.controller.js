'use strict';

(function(){

var module = angular.module('map2App');

module.component('map', {
	templateUrl: 'app/map/map.html',
	bindToController: true,
	controllerAs: '$mapCtrl',
	controller: ['$scope', 'mpConfig', 'mpCortiumService',  function( $scope, config, cortiumService){
		$scope.self = this;
		var self = $scope.self;
		self.selectedCortium = undefined;
		self.cortiums = [];
		self.selectedContinentId = 0;
		self.tileApi = undefined;
		self.continents = config.continents;
		self.urlTemplate = config.templateUrl( self.selectedContinentId );
		//-----------------------------------------------------------------------------------------
		self.update = function(){
			cortiumService.getCortiums( self.selectedContinentId ).then( function( res ){
				self.cortiums = [];
				for( var i=0; i < res.data.length; i++ ){
					self.cortiums.push( { lat: 256*res.data[i].lat, lng: 256*res.data[i].lng } );
				}
			}, function( res ){
				// 見つからない場合
				self.cortiums = [];
			});
		};
		//-----------------------------------------------------------------------------------------
		self.onClickMarker = function( event ){
		};
		//-----------------------------------------------------------------------------------------
		self.onClickMap = function( event ){
			cortiumService.putCortium( {
				continent: self.selectedContinentId, 
				lat: event.latlng.lat / 256,
				lng: event.latlng.lng / 256,
				grade: 1,
			});
		};
		//-----------------------------------------------------------------------------------------
		self.registerTileApi = function( api ){
			self.tileApi = api;
		};
		//-----------------------------------------------------------------------------------------
		self.changeContinent = function( continentId ){
			self.selectedContinentId = continentId;
			self.update();
			self.urlTemplate = config.templateUrl( self.selectedContinentId );
			self.tileApi.rebuildTile();
		};
		//-----------------------------------------------------------------------------------------
	}],
});


})();


