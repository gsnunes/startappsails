require.config({
    urlArgs: 'bust=' + (new Date()).getTime(),
	paths: {
        text: '/bower_components/requirejs-text/text',
        templates: '/templates',

        jquery: '/bower_components/jquery/jquery',
        underscore: '/bower_components/underscore/underscore',
        backbone: '/bower_components/backbone/backbone',
        bootstrap: '/bower_components/bootstrap/docs/assets/js/bootstrap'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        },

        bootstrap: {
            deps: ['jquery']
        }
    }
});


require(['backbone', 'bootstrap', '/client/views/components/MainContainer.js'], function (Backbone, Bootstrap, MainContainer) {
    'use strict';

    if (!authenticated) {
        location.hash = '#/login';
    }
    else {
        location.hash = '#/dashboard';
    }

    var AppRouter = Backbone.Router.extend({
        routes: {
            ':uri_segment_one': 'redirect'
        }
    });

    var app_router = new AppRouter;

    app_router.on('route:redirect', function (uri_segment) {
        if ((!authenticated && uri_segment != 'login') || (authenticated && uri_segment == 'login')) {
            location = '/';
        }
        else {
            var main = new MainContainer({uri_segment: uri_segment});
        }
    });

    Backbone.history.start();
});


require.onError = function (err) {
    if (err.requireType === 'scripterror') {
        location = '/';
    }

    throw err;
};