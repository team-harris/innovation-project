'use strict';

/**
 * @ngdoc overview
 * @name EcoCisco
 * @description #
 *
 * Main module of the application.
 */
(function() {
  var app = angular.module('EcoCisco', []); 

  app.controller('GlobalController', function($scope) {
    $scope.state = {
      isLoggedIn: false
    };

    $scope.changeLoginState = function() {
      this.state.isLoggedIn = true;
    };

  });

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  
  app.controller('LoginController', function($scope) {

      $scope.credentials = {
        username: '',
        password: ''
      };

      $scope.login = function() {
        this.changeLoginState();

        // automatically show My EcoCisco after login 
        this.buttons[0].selected = true;
      };

  });

  app.controller('DashboardController', function($scope) {

    $scope.buttons = [{
      label: 'My EcoCisco', 
      class: 'fa fa-dashboard',
      selected: false
    }, {
      label: 'My EcoStanding',
      class: 'fa fa-table',
      selected: false
    }, {
      label: 'My EcoEnergy',
      class: 'fa fa-bar-chart-o',
      selected: false
    }, {
      label: 'About',
      class: 'fa fa-edit',
      selected: false
    }];

    function returnSelectedButton(array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].selected) {
          return array[i];
        }
      }
      return null;
    }

    $scope.isSelected = function(index) {
      return (this.buttons[index].selected && this.state.isLoggedIn);
    }

    $scope.showPanel = function(panelName) {
      for(var i = 0; i < this.buttons.length; i++) {
        if (panelName == this.buttons[i].label && this.state.isLoggedIn) {
          return true;
        }
      }
      return false;
    }

    $scope.toggle = function(index) {
      if (this.state.isLoggedIn) {
        var prevSelectedElem = returnSelectedButton(this.buttons);
        if (prevSelectedElem) {
          prevSelectedElem.selected = false;
        }
        this.buttons[index].selected = true;
      }
    }

  });
  
  app.controller('MyEcoCiscoController', function($scope) {
    $scope.ECO_CISCO_PANEL = "My EcoCisco";

  });

  app.controller('MyEcoStandingController', function($scope){
    $scope.ECO_STANDING_PANEL = "My EcoStanding";

  });

  app.controller('MyEcoEnergyController', function($scope) {
    $scope.ECO_ENERGY_PANEL = 'MyEcoEnergyController';
  });

  app.controller('AboutController', function($scope) {
    $scope.ABOUT_PANEL = 'AboutController';
  });
    
})();