define([

	'text!templates/settings/GeneralTabView.html',
	'collections/NavigationCollection'
	
], function (template, NavigationCollection) {

	'use strict';

	var GeneralTabView = Backbone.View.extend({

		el: $(template),


		collection: new NavigationCollection(),

		/*
		events: {
			'click form[name="navigation"] button': 'submit',
			'click .drag-nav-items': 'dragNavItems'
		},
		*/


		initialize: function () {
			
		}

	});

	return GeneralTabView;

});