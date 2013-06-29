/*---------------------
	:: Main
	-> controller
---------------------*/
var MainController = {

	index: function (req, res) {
		res.view('main', {logged: req.session.user ? true : false});
	}

};
module.exports = MainController;