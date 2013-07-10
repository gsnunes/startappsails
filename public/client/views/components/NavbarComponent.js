define(['text!templates/components/NavbarComponent.html'], function(template) {

'use strict';

var NavbarComponentView = Backbone.View.extend({

	el: $(template),


	events: {
		'click a.btn-signout': 'signout'
	},


	initialize: function () {
		this.setUsername();
	},


	setUsername: function () {
		this.$el.find('.dropdown-toggle-username').html(session.user.username);
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