require.config({
    urlArgs: 'bust=' + (new Date()).getTime(),
	paths: {
        text: '/bower_components/requirejs-text/text',
        templates: '/templates',
        collections: '/client/collections',
        models: '/client/models',

        jquery: '/bower_components/jquery/jquery',
        underscore: '/bower_components/underscore/underscore',
        backbone: '/bower_components/backbone/backbone',
        bootstrap: '/bower_components/bootstrap/docs/assets/js/bootstrap',

        bower_components: '/bower_components',

        container: '/client/views/components/MainContainer',
        migrations: '/client/views/Migrations'
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
        },

        container: {
            deps: ['backbone']
        }
    }
});


require(['backbone', 'bootstrap', 'container'], function (Backbone, Bootstrap, MainContainer) {
    'use strict';

    if (!session.user) {
        location.hash = '#/login';
    }
    else {
        if (!location.hash) {
            location.hash = '#/dashboard';
        }
    }

    var AppRouter = Backbone.Router.extend({
        routes: {
            ':uri_segment_one': 'redirect'
        }
    });

    var app_router = new AppRouter;

    app_router.on('route:redirect', function (uri_segment) {
        if ((!session.user && uri_segment != 'login') || (session.user && uri_segment == 'login')) {
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