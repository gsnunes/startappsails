define([

	'text!templates/core/components/TabComponentView.html'
	
], function (template) {

	'use strict';

	var TabComponentView = Backbone.View.extend({

		el: $(template),


		events: {},


		add: function (name, content, active) {
			var uniqueId = _.uniqueId('tab_'),
				activeClass = active ? 'active' : '',
				myContent = $('<div class="tab-pane fade in ' + activeClass + '" id="' + uniqueId + '"></div>');

			this.$el.find('#myTab').append('<li class="' + activeClass + '"><a href="#' + uniqueId + '" data-toggle="tab">' + name + '</a></li>');

			myContent.html(content.$el || content);

			this.$el.find('#myTabContent').append(myContent);
		}

	});

	return TabComponentView;

});