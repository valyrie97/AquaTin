const path = require('path');
const {Signale} = require('signale');
const log = new Signale({
	scope: 'CLI'
});
let local = path.join(__dirname, './../modules/')

module.exports = {
	Entities: {
		A: {
			Name: 'module',
			From: local,
			Data: {
				Thing: '#B'
			}
		},
		B: {
			Name: 'module',
			From: local,
			Data: {
				Thing: '#A'
			}
		}
	}
}