/*---------------------
	:: Navigation
	-> controller
---------------------*/
var NavigationController = {

	model: Navigation,

	findAll: function (req, res) {
		Navigation.findAll().sort({parentId: 1}).done(function (err, data) {
			res.send(data);
		});
	}

};
module.exports = NavigationController;