define(['text!templates/login/login.html'], function (template) {

'use strict';

var LoginView = Backbone.View.extend({

	el: $(template),


	events: {
		'click button[name="btn-login"]': 'submit',
		'click button[name="btn-create"]': 'submit'
	},


	submit: function (ev) {
		ev.preventDefault();

		var username = this.$el.find('input[name="username"]');
		var password = this.$el.find('input[name="password"]');
		
		var action = ev.target.name == 'btn-login' ? '/user/login' : '/user/create';

		if (username.val() && password.val()) {
			$.post(action, {username: username.val(), password: password.val()}, function (res) {
				location.hash = '#/dashboard';
			}).fail(function (res) {
				alert('Error: ' + res.getResponseHeader('error'));
			});
		}
		else {
			alert('A username and password is required');
		}
	}

});

return LoginView;

});