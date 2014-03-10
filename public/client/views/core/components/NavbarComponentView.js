define(['text!templates/core/components/NavbarComponentView.html', 'collections/NavigationCollection'], function(template, NavigationCollection) {

'use strict';

var NavbarComponentView = Backbone.View.extend({

	el: $(template),

	navigationCollection: new NavigationCollection,

	navigationLeft: '',
	navigationRight: '',

	events: {
		'click a.btn-signout': 'signout'
	},



	initialize: function () {
		this.getData();
	},



	getData: function () {
		var self = this;

		this.navigationCollection.fetch({
		    success: function (collection, response) {
		    	self.populateNavbar();
		    }
		});
	},



	populateNavbar: function () {
		var self = this, navItems = new Array();

		this.$el.find('.nav-collapse').html('');

		this.navigationCollection.forEach(function (data) {
			var item = data.attributes,
				parentId = item.parent ? item.parent.id : 0;

			if (!navItems[parentId]) {
				navItems[parentId] = [];
			}

			navItems[parentId][item.id] = item;
		});

		this.structureNavigationLeft(navItems, 0);
		this.structureNavigationRight(navItems, 0);
		this.$el.find('.nav-collapse').append(this.navigationLeft);
		this.$el.find('.nav-collapse').append(this.navigationRight);

		this.setUsername();
	},



	structureNavigationRight: function (navItems, parentId, isChildren) {
		this.navigationLeft += '<ul class="' + (isChildren ? 'dropdown-menu' : 'nav pull-right') + '">';

		for (var itemId in navItems[parentId]) {
			var hasChildren = navItems[itemId],
					current = navItems[parentId][itemId];

			if (current.pullRight || isChildren) {
				this.navigationLeft += '<li' + (hasChildren ? ' class="' + (current.parentId ? 'dropdown-submenu' : 'dropdown') + '"' : '') + '><a class="' + (hasChildren ? 'dropdown-toggle ' : '') + (current.className ? current.className : '') + '" ' + (hasChildren ? 'data-toggle="dropdown"' : '') + ' href="' + current.href + '">' + current.name + (hasChildren ? ' <b class="caret"></b>' : '') + '</a>';

				if (hasChildren) {
					this.structureNavigationRight(navItems, itemId, true);
				}

				this.navigationLeft += '</li>';
			}
		}

		this.navigationLeft += '</ul>';
	},



	structureNavigationLeft: function (navItems, parentId, isChildren) {
		this.navigationLeft += '<ul class="' + (isChildren ? 'dropdown-menu' : 'nav') + '">';

		for (var itemId in navItems[parentId]) {
			var hasChildren = navItems[itemId],
					current = navItems[parentId][itemId];

			if (!current.pullRight || isChildren) {
				this.navigationLeft += '<li' + (hasChildren ? ' class="' + (current.parentId ? 'dropdown-submenu' : 'dropdown') + '"' : '') + '><a class="' + (hasChildren ? 'dropdown-toggle ' : '') + (current.className ? current.className : '') + '" ' + (hasChildren ? 'data-toggle="dropdown"' : '') + ' href="' + current.href + '">' + current.name + (hasChildren && !isChildren ? ' <b class="caret"></b>' : '') + '</a>';

				if (hasChildren) {
					this.structureNavigationLeft(navItems, itemId, true);
				}

				this.navigationLeft += '</li>';
			}
		}

		this.navigationLeft += '</ul>';
	},



	countParentPullRights: function (parent) {
		var totalPullRights = 0;

		for (var i = 0, len = parent.length; i < len; i++) {
			if (parent[i] && parent[i].pullRight) {
				totalPullRights++;
			}
		}

		return totalPullRights;
	},



	setUsername: function () {
		var elem = this.$el.find('.dropdown-toggle-username');
		elem.html(elem.text() + ' ' + session.user.username + ' <b class="caret"></b>');
	},



	signout: function (ev) {
		$.post('/user/signout', function (res) {
			location = '/';
		}).fail(function (res) {
			alert('Error: ' + res.getResponseHeader('error'));
		});
	}

});

return NavbarComponentView;

});