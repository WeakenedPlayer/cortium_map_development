'use strict';

(function(){

var module = angular.module('map2App');

module.constant('mapConstant', {
	'urlBase': 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/',
	'format' : '/{z}/{y}/{x}.jpg',
	'continents': [ 
	                    { id: 0, url: 'null', name: '-' },
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
	controller: ['$scope', 'mapConstant', 'coriumService',  function( $scope, mapConstant, coriumService ){
		$scope.self = this;
		// data to bind
		self.selectedCortium = undefined;
		self.cortiums = [];
		self.continentId = 1;
		self.registerCallback = function( tileCallback ){
			self.tileCallback = tielCallback;
		};

		// not for bind
		this.continents = mapConstant.continents;
		this.urlTemplate = 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg';

		this.update = function(){
			coriumService.getCortiums().then( function( res ){
				self.cortiums = [];
				for( var i=0; i < res.data.length; i++ ){
					$scope.self.cortiums.push( { lat: 256*res.data[i].lat, lng: 256*res.data[i].lng } );
				}
			});
			console.log(this.cortiums);
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


module.service('mapUrl', [ 'mapConstant', function(){
	this.templateUrl = function( continentId ){
		return mapConstant.urlBase + mapConstant.continentNames[ continentId ] + mapConstant.format;
	};
}]);


})();


