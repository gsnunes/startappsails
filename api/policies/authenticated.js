/**
* Allow any authenticated user.
*/
module.exports = function (req,res,ok) {
	
	// User is allowed, proceed to controller
	if (req.session.user) {
		return ok();
	}

	// User is not allowed
	else {
		res.redirect('/');
	}
};