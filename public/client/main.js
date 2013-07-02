require.config({
    urlArgs: 'bust=' + (new Date()).getTime(),
	paths: {
        text: '/components/requirejs-text/text',
        templates: '/templates',

        jquery: '/components/jquery/jquery',
        underscore: '/components/underscore/underscore',
        backbone: '/components/backbone/backbone',
        bootstrap: '/components/bootstrap/docs/assets/js/bootstrap'
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


require(['backbone', 'bootstrap'], function (Backbone) {
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
            require(['/client/views/' + uri_segment + '/' + uri_segment + '.js'], function (AppView) {
                var app_view = new AppView;
                $("#main").html(app_view.$el);
            });
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