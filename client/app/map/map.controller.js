'use strict';

(function(){

var module = angular.module('map2App');

module.constant('mapConstant', {
	'urlBase': 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/',
	'format' : '/{z}/{y}/{x}.jpg',
	'continents': [ 
		{ id: 0, url: 'dummy', name: 'dummy' },
		{ id: 1, url: 'indar', name: 'Indar' },
		{ id: 2, url: 'amerish', name: 'Amerish'},
		{ id: 3, url: 'esamir', name: 'Esamir'},
		{ id: 4, url: 'hossin', name: 'Hossin'},
   ],
});

		
module.component('map', {
	templateUrl: 'app/map/map.html',
	bindToController: true,
	controllerAs: '$mapCtrl',
	controller: ['$scope', 'mapConstant', 'mapService', 'coriumService',  function( $scope, mapConstant, mapService, coriumService ){
		$scope.self = this;
		var self = $scope.self;

		self.selectedCortium = undefined;
		self.cortiums = [];
		self.selectedContinent = 1;
		self.tileApi = undefined;
		self.continents = mapConstant.continents;
		self.urlTemplate = mapService.templateUrl( self.selectedContinent );

		self.update = function(){
			coriumService.getCortiums().then( function( res ){
				var self = $scope.self;
				self.cortiums = [];
				for( var i=0; i < res.data.length; i++ ){
					$scope.self.cortiums.push( { lat: 256*res.data[i].lat, lng: 256*res.data[i].lng } );
				}
			});
		};
		
		self.registerTileApi = function( api ){
			self.tileApi = api;
		};
		
		self.changeContinent = function(){
			console.log( self.selectedContinent );
			self.urlTemplate = mapService.templateUrl( self.selectedContinent );
			self.tileApi.rebuildTile();
		};
		
		this.onClickMarker = function( event ){
			};
		this.onClickMap = function( event ){
/*			$http.post("/api/cortiums", {
				continent:1, 
				lat: event.latlng.lat/512,
				lng: event.latlng.lng/512,
				grade: 2
			});*/
		};
	}],
});

module.service( 'coriumService', [ '$http', function($http) {
    this.saveCortium = function( cortium ) {
        return $http.post('/api/cortiums', cortium);
    };
    this.getCortiums = function() {
        return $http.get('/api/cortiums');
    };
    this.getCortium = function( id ) {
        return $http.get('/api/cortiums/' + id);
    };
}]);


module.service('mapService', [ 'mapConstant', function(mapConstant){
	this.templateUrl = function( continentId ){
		return mapConstant.urlBase + mapConstant.continents[ continentId ].url + mapConstant.format;
	};
}]);


})();


