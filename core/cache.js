const fs = require('fs');
const path = require('path');
const {Signale} = require('signale');
const log = new Signale({
	scope: 'CACHE'
});
const rmrf = require('rimraf');

module.exports.Cache = class Cache {
	constructor (basePath) {
		this.paths = {
			base: basePath,
			code: path.join(basePath, 'code'),
			instances: path.join(basePath, 'instances')
		}
		this.createStructure();

		this.loadCache();
	}

	createStructure() {
		try {
			fs.mkdirSync(this.paths.base);
			fs.mkdirSync(this.paths.code);
			fs.mkdirSync(this.paths.instances);
		} catch (e) {};
	}

	cleanup() {
		rmrf.sync(this.paths.base);
		this.createStructure();
	}

	loadCache() {
		// log.debug(this.paths)
		// if(fs.existsSync(this.paths.code))
		for(let file of fs.readdirSync(this.paths.code)) {
			// TODO like... do this
		}
	}

	addEntity(name, code) {
		fs.writeFileSync(path.join(this.paths.code, `${name}.js`), code);
	}

	addInstance(instance) {
		fs.writeFileSync(path.join(this.paths.instances, `${instance._id}.json`), JSON.stringify(instance, null, 2));
	}

	getInstances() {
		return fs.readdirSync(this.paths.instances).map((val) => {
			return val.split('.')[0];
		});
	}

	getEntityCodePathFromUuid(uuid) {
		let instancePath = path.join(this.paths.instances, `${uuid}.json`);
		let codePath = path.join(this.paths.code, `${require(instancePath).Name}.js`);
		return codePath;
	}
	getDataFromUuid(uuid) {
		let instancePath = path.join(this.paths.instances, `${uuid}.json`);
		return require(instancePath).data;
	}

	getInstanceFromUuid(uuid) {
		let instancePath = path.join(this.paths.instances, `${uuid}.json`);
		return require(instancePath);
	}
}