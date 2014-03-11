define([

	'/client/views/core/components/NavbarComponentView.js'

], function (NavbarComponent) {

	'use strict';

	var MainContainerView = Backbone.View.extend({

		el: $('#main'),


		events: {},


		initialize: function (args) {
			var uri_segment = args.uri_segment,
				self = this;

			require(['/client/views/' + uri_segment + '/' + (uri_segment.charAt(0).toUpperCase() + uri_segment.slice(1)) + 'View.js'], function (AppView) {
				var app_view = new AppView(),
					navbar;
					
				self.$el.html(app_view.$el);

				if (uri_segment !== 'login') {
					navbar = new NavbarComponent();
					self.$el.prepend(navbar.$el);
				}
			});
		}

	});

	return MainContainerView;

});