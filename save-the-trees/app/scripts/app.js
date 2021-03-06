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
        this.toggleDashboard(0);
      };

  });

  app.controller('DashboardController', function($scope) {

    $scope.buttons = [{
      label: 'My EcoCisco', 
      class: 'fa fa-dashboard',
      id: "my-ecocisco-button",
      selected: false
    }, {
      label: 'My EcoStanding',
      class: 'fa fa-table',
      id: "my-ecostanding-button",
      selected: false
    }, {
      label: 'My EcoEnergy',
      class: 'fa fa-bar-chart-o',
      id: "my-ecoenergy-button",
      selected: false
    }, {
      label: 'About',
      class: 'fa fa-edit',
      id: "about-button",
      selected: false
    }];

    $scope.activePanel = '';

    function returnSelectedButton(array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].selected) {
          return array[i];
        }
      }
      return null;
    };

    $scope.isSelected = function(index) {
      return (this.buttons[index].selected && this.state.isLoggedIn);
    };

    $scope.panelIsSelected = function(panelName) {
      for(var i = 0; i < this.buttons.length; i++) {
        if (panelName == this.buttons[i].label && this.state.isLoggedIn && this.buttons[i].selected) {
          return true;
        }
      }
      return false;
    };

    $scope.toggleDashboard = function(index) {
      if (this.state.isLoggedIn) {
        var prevSelectedElem = returnSelectedButton(this.buttons);
        if (prevSelectedElem) {
          prevSelectedElem.selected = false;
        }
        this.buttons[index].selected = true;
        this.activePanel = this.buttons[index].label
      }
    };

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    function getActiveElement(array) {
      for (var i = 0; i < array.length; i++) {
        var element = document.getElementById(array[i]);
        if (element.classList.contains("active")) {
          return element;
        }
      }
    }

    $scope.toggleActiveTabs = function(panelArray) {
      var element = document.getElementById(panelArray[0]);
      var activeElement = getActiveElement(panelArray);
      activeElement.classList.remove("active");
      element.classList.add("active");
    };

    $scope.toggleActivePanel = function(elementId) {
      var element = document.getElementById(elementId);
      return element.classList.contains("active");
    }

  });
  
  app.controller('MyEcoCiscoController', function($scope) {
    $scope.PANEL = "My EcoCisco";
    $scope.showPanel = function() {
      return this.panelIsSelected(this.PANEL);
    };

  });

  app.controller('MyEcoStandingController', function($scope){
    $scope.PANEL = "My EcoStanding";
    $scope.showPanel = function() {
      return this.panelIsSelected(this.PANEL);
    };

  });

  app.controller('MyEcoEnergyController', function($scope) {
    $scope.PANEL = 'My EcoEnergy';
    $scope.showPanel = function() {
      return this.panelIsSelected(this.PANEL);
    };

  });

  app.controller('AboutController', function($scope) {
    $scope.PANEL = 'About';
    $scope.showPanel = function() {
      return this.panelIsSelected(this.PANEL);
    };

  });
    
})();