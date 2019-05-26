const fs = require('fs');
const path = require('path');

module.exports.Cache = class Cache {
	constructor (basePath) {
		this.paths = {
			base: basePath,
			code: path.join(basePath, 'code'),
			instances: path.join(basePath, 'instances')
		}
		
		try {
			fs.mkdirSync(this.paths.base);
			fs.mkdirSync(this.paths.code);
			fs.mkdirSync(this.paths.instances);
		} catch (e) {};

		this.loadCache();
	}

	loadCache() {
		for(let file of fs.readdirSync(this.paths.code)) {
			// TODO like... do this
		}
	}

	addEntity(name, code) {
		console.log(`writing ${name}...`);
		fs.writeFileSync(path.join(this.paths.code, `${name}.js`), code);
	}

	addInstance(instance) {
		console.log(`writing ${instance}...`);
		fs.writeFileSync(path.join(this.paths.instances, `${instance._id}.json`), JSON.stringify(instance, null, 2));
	}
}