define(['text!templates/admin/admin.html'], function (template) {

'use strict';

var AdminView = Backbone.View.extend({

	el: $(template)

});

return AdminView;

});