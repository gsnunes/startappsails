define(['text!templates/dashboard/dashboard.ejs'], function(template) {
  'use strict';

  var DashboardView = Backbone.View.extend({
    el: $(template),

    events: {
    },

    initialize: function() {
      
    }

  });

  return DashboardView;

});