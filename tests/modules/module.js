const {Signale} = require('signale');
const log = new Signale({
	scope: 'MODULE'
});

module.exports.entity = class module {
	async start() {
		
		console.log(this.data)
		if(this.data.boop)
			this.boop();
	}

	async boop() {
		log.info(`Boop! ${this.data.thing}`)
		await new Promise(res => setTimeout(res, 1000));
		this.send('boop', this.data.thing)
	}
}

