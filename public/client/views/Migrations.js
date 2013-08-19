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
		var self = this;
		
		this.navigationCollection.create({name: 'Dashboard', href: '#/dashboard', required: true}, {
		    success: function (data) {
				self.navigationCollection.create({name: 'Logged in as', required: true, pullRight: true, className: 'dropdown-toggle-username'}, {
				    success: function (data) {
				    	var logged = data.attributes;
				    	
						self.navigationCollection.create({name: 'Settings', href: '#/settings', required: true, parent: logged, parentId: logged.id}, {
						    success: function (data) {
								self.navigationCollection.create({name: 'Sign out', required: true, parent: logged, parentId: logged.id, className: 'btn-signout'}, {
								    success: function (data) {
										console.log('initialNavigationStructure');
									}
								});
							}
						});
					}
				});
			}
		});
	}

});

return MigrationsView;

});