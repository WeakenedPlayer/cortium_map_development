'use strict';

angular.module('map2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map',
        template: '<map></map>'
      });
  });
