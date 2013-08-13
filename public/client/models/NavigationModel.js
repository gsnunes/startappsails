define(function () {

'use strict';

var NavigationModel = Backbone.Model.extend({

	defaults: {
		href: 'javascript:;',
		required: false,
		parent: null
	}

});

return NavigationModel;

});