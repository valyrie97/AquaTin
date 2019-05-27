const path = require('path');
const {Signale} = require('signale');
const log = new Signale({
	scope: 'CLI'
});

module.exports = {
	Parameters: {
		Source: path.join(__dirname, './../modules/')
	},
	Entities: {
		Tester: {
			Name: 'module',
			From: '$Source',
			Data: {
				Thing: 5
			}
		}
	}
}