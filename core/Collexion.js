const {Signale} = require('signale');
const log = new Signale({
	scope: 'CORE'
});

class Collexion {
	constructor(template) {
		this.entities = {};
		(async () => {
			const instances = {};
			
			log.info('Starting Collexion with ' + Object.keys(template) + ' Objects')

			// call constructors on objects, and give them their data
			for(const symbol in template) {
				const instTemplate = template[symbol];
				const _class = instTemplate.Code;
				const inst = new _class(this);
				// guarantee at least an object in _data
				inst._data = {...instTemplate.Data};
				instances[symbol] = inst;
			}

			//call start in each instance.
			for(const symbol in instances) {
				const inst = instances[symbol];
				if('start' in inst)
					await inst.start()
			}

			for(const symbol in instances) {
				const inst = instances[symbol];
				for(const symbol in instances) {
					inst[symbol] = instances[symbol];
				}
			}

			for(const symbol in instances) {
				const inst = instances[symbol];
				if('connected' in inst)
					await inst.connected()
			}

		})();
	}
}

module.exports = {Collexion, Link, Component};