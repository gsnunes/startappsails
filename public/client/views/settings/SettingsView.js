define([

	'text!templates/settings/SettingsView.html',
	'/client/views/core/components/TabComponentView.js',
	'/client/views/settings/NavigationTabView.js',
	'/client/views/settings/GeneralTabView.js',
	'/client/views/settings/BowerTabView.js'
	
], function (template, TabComponentView, NavigationTabView, GeneralTabView, BowerTabView) {

	'use strict';

	var SettingsView = Backbone.View.extend({

		el: $(template),


		initialize: function () {
			this.createTabs();
		},


		createTabs: function () {
			var tabComponentView = new TabComponentView(),
				navigationTabView = new NavigationTabView(),
				generalTabView = new GeneralTabView(),
				bowerTabView = new BowerTabView();

			tabComponentView.add('General', generalTabView, true);
			tabComponentView.add('Navigation', navigationTabView, false);
			tabComponentView.add('Bower', bowerTabView, false);

			this.$el.find('.settings-box').html(tabComponentView.$el);
		}

	});

	return SettingsView;

});