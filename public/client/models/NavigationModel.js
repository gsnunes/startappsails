define(function () {

'use strict';

var NavigationModel = Backbone.Model.extend({

	defaults: {
		href: '#',
		required: false,
		parent: null
	}

});

return NavigationModel;

});