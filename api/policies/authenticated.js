/**
* Allow any authenticated user.
*/
module.exports = function (req,res,ok) {
	var allowedControllers = ['main', 'user'];

	if (allowedControllers.indexOf(req.route.params.controller) == -1) {
		if (req.session.user) {
			return ok();
		}
		else {
			res.redirect('/');
		}
	}
	else {
		return ok();
	}
};