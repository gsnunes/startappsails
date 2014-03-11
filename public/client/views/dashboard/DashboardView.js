define([

	'text!templates/dashboard/DashboardView.html',
	'/client/views/core/components/NavbarComponentView.js'

], function (template, NavbarComponent) {

	'use strict';

	var DashboardView = Backbone.View.extend({

		el: $(template)

	});

	return DashboardView;

});