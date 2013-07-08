/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

	signup: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');

		User.findByUsername(username).done(function (err, usr) {
			if (err) {
				res.send(500, {error: 'DB Error'});
			}
			else if (usr) {
				res.send(400, {error: 'Username already Taken'});
			}
			else {
				var hasher = require('password-hash');
				password = hasher.generate(password);

				User.create({username: username, password: password}).done(function (error, user) {
					if (error) {
						res.send(500, {error: 'DB Error'});
					}
					else {
						req.session.user = user;
						res.send(user);
					}
				});
			}
		});	
	},


	signin: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');

		User.findByUsername(username).done(function (err, usr) {
			if (err) {
				res.send(500, {error: 'DB Error'});
			}
			else {
				if (usr) {
					var hasher = require('password-hash');

					if (hasher.verify(password, usr.password)) {
						req.session.user = usr;
						res.send(usr);
					}
					else {
						res.send(400, {error: 'Wrong Password'});
					}
				}
				else {
					res.send(404, {error: 'User not Found'});
				}
			}
		});
	},


	signout: function (req, res) {
		req.session.destroy();
		res.send();
	}

};
module.exports = UserController;