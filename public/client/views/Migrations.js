define(['collections/NavigationCollection'], function (NavigationCollection) {

'use strict';

var MigrationsView = Backbone.View.extend({

	navigationCollection: new NavigationCollection,

	initialize: function () {
		this.checkFirstTime();
	},


	checkFirstTime: function () {
		var self = this;

		this.navigationCollection.fetch({
		    success: function(collection, response) {
		        if (!response.length) {
		        	self.migrations();
		        }
		    }
		});
	},


	migrations: function () {
		this.initialNavigationStructure();
	},


	initialNavigationStructure: function () {
		this.navigationCollection.create({name: 'Dashboard'});
		this.navigationCollection.create({name: 'Logged in as'});
		this.navigationCollection.create({name: 'Settings'});
		this.navigationCollection.create({name: 'Sign out'});
	}

});

return MigrationsView;

});