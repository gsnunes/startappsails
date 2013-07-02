/**
* Policy defines middleware that is run before each controller/controller.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

	// Default policy (Apply the "authenticated" policy to all controllers)
	'*': 'authenticated',

	// Allow public access
	'main': true,
	'user': true

	/** Example mapping: 
	someController: {

		// Apply the "authenticated" policy to all actions
		'*': 'authenticated',

		// For someAction, apply 'somePolicy' instead
		someAction: 'somePolicy'
	}
	*/
};