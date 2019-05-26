module.exports = {
	Parameters: {
		Source: './../modules/'
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