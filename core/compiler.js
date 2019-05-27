const {Cache} = require('./cache.js');
const {retrieveModule} = require('./retrieveModule.js');


module.exports.compile = compile;


/// cache is the (likely path) string to describe where the cache is store
/// on the web this might be a database name for example.
/// index, is the post pre compiled index.
async function compile({cache: cachePath, index}) {
	const cache = new Cache(cachePath);
	// const modules = {};

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