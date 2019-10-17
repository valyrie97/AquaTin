const {Signale} = require('signale');
const log = new Signale({
	scope: 'PING_PONG'
});

module.exports = class module {
	async start() {
		// console.log(this._data)
	}

	connected() {
		if(this._data.boop)
			this.boop();
	}

	async boop() {
		log.info(`Boop!`)
		await new Promise(res => setTimeout(res, 1000));
		this[this.boop].boop();
	}
}

