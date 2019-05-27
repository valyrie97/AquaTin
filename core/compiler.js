const {Cache} = require('./cache.js');
const {retrieveModule} = require('./retrieveModule.js');
const {Signale} = require('signale');
const uuid = require('uuid');
const log = new Signale({
	scope: 'COMPILER'
});

module.exports.compile = compile;


async function compile({cache: cachePath, index}) {
	index = compileParameters(index);
	log.info('parameters injected');
	
	
	index = compileLinks(index);
	log.info('entity links created')


	await createCache({
		index: index,
		cache: cachePath
	});

	log.info('cache created')
}

/// cache is the (likely path) string to describe where the cache is store
/// on the web this might be a database name for example.
/// index, is the post pre compiled index.
async function createCache({cache: cachePath, index}) {
	const cache = new Cache(cachePath);
	// const modules = {};
	cache.cleanup();

	for(const symbol in index.Entities) {
		const module = index.Entities[symbol];

		let code = await retrieveModule(module.From, module.Name);
		// modules[module.Name] = code;
		cache.addEntity(module.Name, code);
	}

	for(const symbol in index.Entities) {
		cache.addInstance(index.Entities[symbol]);
	}
}


function compileParameters (index) {
	let entities = index.Entities;

	for(const key in index.Parameters) {
		entities = recursiveReplace(entities, `\$${key}`, index.Parameters[key]);
	}

	return {
		Entities: entities
	};
}

function compileLinks (index) {
	index = {...index};

	//assign all _ids
	for(const symbol in index.Entities) {
		const ent = index.Entities[symbol];
		ent._id = uuid.v4();
	}

	// loopback and replace all #links in Data with _ids
	for(const symbol in index.Entities) {
		let data = index.Entities[symbol].data;
		
		for(const targetSymbol in index.Entities) {
			data = recursiveReplace(data, `#${targetSymbol}`, index.Entities[targetSymbol]._id)
		}

		index.Entities[symbol].data = data;
	}

	return index;
}


function recursiveReplace(obj, find, replace) {
	switch(typeof obj) {
		case 'string': {
			if(obj === find) return replace;
			else return obj;
		}
		case 'object': {
			if(Array.isArray(obj)) {
				const newArr = [];
				for(const value of obj) {
					newArr.push(recursiveReplace(value, find, replace));
				}
				return newArr;
			} else {
				const newObj = {};
				for (const key in obj) {
					newObj[key] = recursiveReplace(obj[key], find, replace);
				}
				return newObj;
			}
		}
		default: {
			return obj;
		}
	}
}