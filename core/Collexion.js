const {Signale} = require('signale');
const log = new Signale({
	scope: 'COLLEXION'
});
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const root = (typeof window === 'undefined' ? global : window)
const {Entity} = require('./entity.js')

class Link {
	constructor(symbol) {
		this.symbol = symbol;
	}

	toString() {
		return "" + this.symbol;
	}
}

class Collexion {
	constructor() {
		// this.cache = cache;
		this.entities = {};
		// for(const uuid of cache.getInstances()) {
		// 	this.loadEntity(uuid)
		// }
	}

	createInstances(template) {
		const instances = {};
		
		for(const symbol in template) {
			const instTemplate = template[symbol];
			const _class = instTemplate.Code;
			const inst = new _class(this);
			inst._data = instTemplate.Data;
			instances[symbol] = inst;
		}

		for(const symbol in instances) {
			const inst = instances[symbol];
			inst.start()
		}

		for(const symbol in instances) {
			const inst = instances[symbol];
			const instTemplate = template[symbol];
			inst._links = instTemplate.Links;

			for (const linkKey in inst._links) {
				const link = inst._links[linkKey];
				inst._links[linkKey] = instances[link];
			}
		}

		for(const symbol in instances) {
			const inst = instances[symbol];
			inst.connected()
		}
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

module.exports = {Collexion, Link};