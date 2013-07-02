/**
* Allow any authenticated user.
*/
module.exports = function (req,res,ok) {
	
	// User is allowed, proceed to controller
	if (req.session.authenticated) {
		return ok();
	}

	// User is not allowed
	else {
		res.redirect('/');
	}
};