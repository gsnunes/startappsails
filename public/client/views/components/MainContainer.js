define(['/client/views/components/NavbarComponent.js'], function(NavbarComponent) {

'use strict';

var MainContainerView = Backbone.View.extend({

	el: $('#main'),


	events: {
	},


	initialize: function(args) {
		var uri_segment = args.uri_segment, self = this;

		require(['/client/views/' + uri_segment + '/' + uri_segment + '.js'], function (AppView) {
            var app_view = new AppView;
            self.$el.html(app_view.$el);

            if (uri_segment != 'login') {
				var navbar = new NavbarComponent();
				self.$el.prepend(navbar.$el);
			}
        });
	}

});

return MainContainerView;

});