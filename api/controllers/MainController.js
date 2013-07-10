/*---------------------
	:: Main
	-> controller
---------------------*/
var MainController = {

	index: function (req, res) {
		res.view({session: JSON.stringify(req.session)});
	}

};
module.exports = MainController;