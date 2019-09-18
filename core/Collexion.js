const {Signale} = require('signale');
const log = new Signale({
	scope: 'EXEC'
});
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const timeout = 3000;
const root = (typeof window === 'undefined' ? global : window)
const {Entity} = require('./entity.js')


class System {
	constructor(cache) {
		this.cache = cache;
		this.entities = {};
		for(const uuid of cache.getInstances()) {
			this.loadEntity(uuid)
		}
	}

	async send(name, destination, options) {
		// log.debug(`sending ${name}`);

		if(!(destination in this.entities)) {
			this.loadEntity(destination);
			log.debug('loading entity...')
		}

		this.entities[destination].dispatch(name, options);
	}

	loadEntity(uuid) {
		// log.debug(`spinning up ${uuid}`);
		log.debug(uuid)
		if(typeof require === 'function') {
			let codePath = this.cache.getEntityCodePathFromUuid(uuid);
			// log.debug(codePath)
			let data = this.cache.getDataFromUuid(uuid);
			let instanceData = this.cache.getInstanceFromUuid(uuid);
			let userCode = require(codePath).entity;
			this.entities[uuid] = new Entity(userCode, instanceData, this);
			this.entities[uuid].start();
			log.debug('starting', uuid)
		} else {
			//TODO COMPLICATED EVAL SHIT, MIRRORING REQUIRE FUNCTIONALITY
		}
	}


}

module.exports = {System};