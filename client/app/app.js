'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';
import ngTable from 'angular-material-data-table';

// import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import scoreboard from './scoreboard/scoreboard.component';
import chat from './chat/chat.component';
import question from './question/question.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

angular.module('ctfApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
    /*uiBootstrap,*/ _Auth, account, admin, navbar, footer, main, scoreboard,chat, question, constants, socket, util,
    ngAnimate,ngAria,ngMaterial,ngTable,"xeditable"
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth,editableOptions) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['ctfApp'], {
      strictDi: false
    });
  });
