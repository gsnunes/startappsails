define([

	'models/NavigationModel'
	
], function (NavigationModel) {

	'use strict';

	var NavigationCollection = Backbone.Collection.extend({

		url: '/navigation',
		model: NavigationModel

	});

	return NavigationCollection;

});