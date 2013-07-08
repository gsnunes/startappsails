define(['text!templates/dashboard/dashboard.html', '/client/views/components/NavbarComponent.js'], function(template, NavbarComponent) {
'use strict';

var DashboardView = Backbone.View.extend({

	el: $(template),


	events: {
	},


	initialize: function() {
	}

});

return DashboardView;

});