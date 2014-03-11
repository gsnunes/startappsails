define([

	'text!templates/settings/SettingsView.html',
	'/client/views/settings/NavigationTabView.js',
	'/client/views/core/components/TabComponentView.js'
	
], function (template, NavigationTabView, TabComponentView) {

	'use strict';

	var SettingsView = Backbone.View.extend({

		el: $(template),


		initialize: function () {
			this.createTabs();
		},


		createTabs: function () {
			var tabComponentView = new TabComponentView(),
				navigationTabView = new NavigationTabView();

			tabComponentView.add('Navigation', navigationTabView, true);

			this.$el.find('.settings-box').html(tabComponentView.$el);
		}

	});

	return SettingsView;

});