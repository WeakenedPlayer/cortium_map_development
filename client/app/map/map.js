'use strict';
// ルーティングの追加(本体はmap.controller.jsで定義されるディレクティブ<map>で定義される)
angular.module('map2App')
.config(function ($stateProvider) {
	$stateProvider
	.state('map', {
		url: '/map',
		template: '<map class="container-full"></map>'
	});
});
