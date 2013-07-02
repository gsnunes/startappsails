define(['text!templates/dashboard/dashboard.html'], function(template) {
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