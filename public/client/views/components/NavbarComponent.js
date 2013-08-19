define(['text!templates/components/NavbarComponent.html', 'collections/NavigationCollection'], function(template, NavigationCollection) {

'use strict';

var NavbarComponentView = Backbone.View.extend({

	el: $(template),

	navigationCollection: new NavigationCollection,

	navigation: '',

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

		this.navigationCollection.forEach(function (data) {
			var item = data.attributes,
				parentId = item.parent ? item.parent.id : 0;

			if (!navItems[parentId]) {
				navItems[parentId] = [];
			}

			navItems[parentId][item.id] = item;
		});

		this.structureNavigation(navItems, 0);
		this.$el.find('.nav-collapse').html(this.navigation);

		this.setUsername();
	},



	structureNavigation: function (navItems, parentId, isChildren) {
		this.navigation += '<ul class="' + (isChildren ? 'dropdown-menu' : 'nav') + '">';

		for (var itemId in navItems[parentId]) {
			var hasChildren = navItems[itemId],
				current = navItems[parentId][itemId];

			if (current.pullRight) {
				this.navigation += '<ul class="nav pull-right">';
			}

			this.navigation += '<li' + (hasChildren ? ' class="dropdown"' : '') + '><a class="' + (hasChildren ? 'dropdown-toggle ' : '') + (current.className ? current.className : '') + '" ' + (hasChildren ? 'data-toggle="dropdown"' : '') + ' href="' + current.href + '">' + current.name + (hasChildren ? ' <b class="caret"></b>' : '') + '</a>';

			if (hasChildren) {
				this.structureNavigation(navItems, itemId, true);
			}

			this.navigation += '</li>';

			var totalPullRights = this.countParentPullRights(navItems[parentId]);

			if (!hasChildren && ((navItems[parentId].length - 1) - totalPullRights) == itemId) {
				this.navigation += '</ul>';
			}

			if (current.pullRight) {
				this.navigation += '</ul>';
			}
		}
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