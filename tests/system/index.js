const path = require('path');
let local = path.join(__dirname, './../modules/')

module.exports = {
	Entities: {
		A: {
			Name: 'module',
			From: local,
			data: {
				thing: '#B',
				boop: true
			}
		},
		B: {
			Name: 'module',
			From: local,
			data: {
				thing: '#A'
			}
		}
	}
}