'use strict';

PS2MAP.service( 'mpCortiumService', [ '$http', function($http) {
	this.putCortium = function( cortium ) {
        return $http.post('/api/cortiums', cortium);
    };
    this.getCortiums = function( continentId ) {
    	if( continentId !== undefined ){
            return $http.get('/api/cortiums/?continent=' + continentId );    		
    	} else {
    		return $http.get('/api/cortiums');
    	}
    };
    this.getCortium = function( id ) {
        return $http.get('/api/cortiums/' + id);
    };
}]);

