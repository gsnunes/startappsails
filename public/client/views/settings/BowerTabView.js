define([

	'text!templates/settings/BowerTabView.html'

], function (template) {

	'use strict';

	var BowerTabView = Backbone.View.extend({

		el: $(template),


		initialize: function () {
			var self = this;

			$.get('/bower', function (data) {
				var items = [];

				$.each(data.dependencies, function (key, val) {
					items.push('<tr><td>' + key + '</td><td>' + val + '</td></tr>');
				});

				self.$el.find('table tbody').html(items.join(''));
			});
		}

	});

	return BowerTabView;

});