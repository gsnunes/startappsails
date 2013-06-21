/*---------------------
	:: Home 
	-> controller
---------------------*/
var HomeController = {

index: function (req, res) {
    if (req.session.user) {
		res.view();
	} else {
		res.redirect('/');
	}
}

};
module.exports = HomeController;