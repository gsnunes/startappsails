/*---------------------
	:: Navigation
	-> model
---------------------*/
module.exports = {

	attributes: {
		name: 'STRING',
		parent: 'JSON',
		href: 'STRING',
		required: 'BOOLEAN',
		parentId: 'INTEGER',
		pullRight: 'BOOLEAN',
		className: 'STRING'
	}

};