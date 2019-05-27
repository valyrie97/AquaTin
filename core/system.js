const {Signale} = require('signale');
const log = new Signale({
	scope: 'EXEC'
});
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const timeout = 3000;
const root = (typeof window === 'undefined' ? global : window)

module.exports.System = class System {
	constructor(cache) {
		this.cache = cache;
		this.entities = {};
		for(const uuid of cache.getInstances()) {
			this.send('Start', uuid)
		}
	}

	async send(name, destination, options) {
		// log.debug(`sending ${name}`);

		if(!(destination in this.entities))
			this.loadEntity(destination);

		let a = require('./../tests/modules/module.js').entity
		let b = new a({});

		if(name in this.entities[destination])
			this.entities[destination][name](options);
		
		else if('*' in this.entities[destination])
			this.entities[destination]['*'](options);

		else log.warn(`method ${name} does not exist for ${destination}`);
	}

	loadEntity(uuid) {
		// log.debug(`spinning up ${uuid}`);
		if(typeof require === 'function') {
			let codePath = this.cache.getEntityCodePathFromUuid(uuid);
			// log.debug(codePath)
			let data = this.cache.getDataFromUuid(uuid);
			let entityProto = require(codePath).entity;
			this.entities[uuid] = new entityProto(data);
		} else {
			//TODO COMPLICATED EVAL SHIT, MIRRORING REQUIRE FUNCTIONALITY
		}
	}


}