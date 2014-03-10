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

        container: '/client/views/core/containers/MainContainerView',
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
        window.location.hash = '#/login';
    }
    else {
        if (!window.location.hash) {
            window.location.hash = '#/dashboard';
        }
    }

    var AppRouter = Backbone.Router.extend({
        routes: {
            ':uri_segment_one': 'redirect'
        }
    }),
    app_router = new AppRouter();

    app_router.on('route:redirect', function (uri_segment) {
        if ((!session.user && uri_segment !== 'login') || (session.user && uri_segment === 'login')) {
            window.location = '/';
        }
        else {
            var main = new MainContainer({uri_segment: uri_segment});
        }
    });

    Backbone.history.start();
});


require.onError = function (err) {
    'use strict';

    if (err.requireType === 'scripterror') {
        window.location = '/';
    }

    throw err;
};