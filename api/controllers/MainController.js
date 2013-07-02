/*---------------------
	:: Main
	-> controller
---------------------*/
var MainController = {

	index: function (req, res) {
		res.view({authenticated: req.session.user ? true : false});
	}

};
module.exports = MainController;