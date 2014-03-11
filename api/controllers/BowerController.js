/*---------------------
	:: Bower
	-> controller
---------------------*/
var BowerController = {

	index: function (req, res) {
		var bower = require(sails.config.paths.app + '/bower.json');
		res.send(bower);
	}

};
module.exports = BowerController;