define(['text!templates/settings/settings.html', 'collections/NavigationCollection'], function (template, NavigationCollection) {

'use strict';

var SettingsView = Backbone.View.extend({

	el: $(template),


	collection: new NavigationCollection,


	events: {
		'click form[name="navigation"] button': 'submit',
		'click .drag-nav-items': 'dragNavItems'
	},


	initialize: function () {
		this.getData();
	},


	dragNavItems: function (ev) {
		if (!$(ev.currentTarget).hasClass('active')) {
			console.log('a');
		}
		else {
			console.log('b');
		}
	},


	getData: function () {
		var self = this;

		this.collection.fetch({
		    success: function(collection, response) {
		    	self.populateTable();
		    	self.populateParentSelect(response);
		    }
		});
	},


	populateTable: function () {
		var self = this, rows = '';


		this.collection.forEach(function (data) {
			var data = data.attributes;

			rows += '<tr><td>' + data.id + '</td><td>' + data.name + '</td><td>' + (data.parent ? data.parent.name : '') + '</td><td>' + data.createdAt + '</td><td>' + data.updatedAt + '</td><td><a href="javascript:;" id="' + data.id + '" class="btn-edit">Edit</a> | <a href="javascript:;" id="' + data.id + '" class="btn-remove">Remove</a></td></tr>';
		});

        this.$el.find('table tbody').html(rows);

        this.$el.find('table tbody tr a.btn-edit').bind('click', function () {
        	self.editItem($(this).attr('id'));
        });

        this.$el.find('table tbody tr a.btn-remove').bind('click', function () {
        	self.removeItem($(this).attr('id'));
        });
	},


	editItem: function (id) {
		var data = this.collection.get(id).attributes;

		this.$el.find('input[name="id"]').val(data.id);
		this.$el.find('input[name="name"]').val(data.name);
		this.$el.find('select').val(data.parent ? data.parent.id : '');
	},


	removeItem: function (id) {
		var self = this;

		this.collection.get(id).destroy({
		    success: function () {
		    	self.populateTable();
			}
		});
	},


	populateParentSelect: function (data) {
		var options = '<option value=""></option>';

		for (var i = 0, len = data.length; i < len; i++) {
        	options += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
        }

        this.$el.find('select').html(options);
	},


	submit: function (ev) {
		ev.preventDefault();

		var self = this;

		var id = this.$el.find('input[name="id"]');
		var name = this.$el.find('input[name="name"]');
		var parent = this.$el.find('select');
		var parentDTO = parent.val() ? this.collection.get(parent.val()) : null;

		if (!id.val()) {
			this.collection.create({name: name.val(), parent: parentDTO, parentId: parentDTO ? parentDTO.id : null}, {
			    success: function () {
			    	id.val('');
			    	name.val('');
			    	parent.val('');

					self.populateTable();
				}
			});
		} else {
			this.collection.get(id.val()).save({name: name.val(), parent: parentDTO, parentId: parentDTO ? parentDTO.id : null}, {
			    success: function () {
			    	id.val('');
			    	name.val('');
			    	parent.val('');

					self.populateTable();
				}
			});
		}
	}

});

return SettingsView;

});