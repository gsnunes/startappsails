define(['text!templates/settings/settings.html', 'collections/NavigationCollection', 'bower_components/jstree/dist/jstree'], function (template, NavigationCollection) {

'use strict';

var SettingsView = Backbone.View.extend({

	el: $(template),
	collection: new NavigationCollection,


	events: {
		'click form[name="navigation"] button': 'submit'
	},


	initialize: function () {
		this.populate();
	},


	populate: function () {
		var rows = '', self = this;
		this.collection.fetch({
		    success: function(collection, response) {
		        for (var i = 0; i < response.length; i++) {
		        	rows += '<li id="' + response[i].id + '"><a href="#">' + response[i].name + '</a></li>';
		        }

		        self.$el.find('#treeview ul').html(rows);
		        self.$el.find('#treeview').jstree({core: {themes: {dir: 'bower_components/jstree/src/themes'}}});
		    }
		});

		/*
		var rows = '', self = this;
		this.collection.fetch({
		    success: function(collection, response) {
		        for (var i = 0; i < response.length; i++) {
		        	rows += '<tr><td>' + response[i].id + '</td><td>' + response[i].name + '</td><td>' + response[i].createdAt + '</td><td>' + response[i].updatedAt + '</td></tr>';
		        }

		        self.$el.find('table tbody').html(rows);
		    }
		});
		*/
	},


	submit: function (ev) {
		ev.preventDefault();

		var name = this.$el.find('input[name="name"]');

		var self = this;
		this.collection.create({name: name.val()}, {
		    success: function () {
				self.populate();
			}
		});
	}

});

return SettingsView;

});