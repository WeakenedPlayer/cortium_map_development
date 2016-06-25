'use strict';

// URLの形式や大陸の表示名を設定
PS2MAP.constant('mpConfig', {
	urlBase: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/',
	format: '/{z}/{y}/{x}.jpg',
	continents: [ 
		{ id: 0, url: 'indar', name: 'Indar' },
		{ id: 1, url: 'amerish', name: 'Amerish'},
		{ id: 2, url: 'esamir', name: 'Esamir'},
		{ id: 3, url: 'hossin', name: 'Hossin'},
	],
	templateUrl: function( continentId ){
		return this.urlBase + this.continents[ continentId ].url + this.format;
	},
});

