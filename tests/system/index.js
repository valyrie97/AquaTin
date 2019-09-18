const path = require('path');

const ref = require('./node_modules/aqua').Reference;

const ExampleModule = require('./module.js');

module.exports = {
	Entities: {
		A: {
			Code: ExampleModule,
			Data: {
				thing: ref('B'),
				boop: true
			}
		},
		B: {
			Code: ExampleModule,
			Data: {
				thing: ref('B')
			}
		}
	}
}

