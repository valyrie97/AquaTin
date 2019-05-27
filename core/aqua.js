#!/usr/bin/env node
const {Signale} = require('signale');
const log = new Signale({
	scope: 'CLI'
});
const interactive = new Signale({interactive: true});
const path = require('path');
const fs = require('fs');

require('yargs')
	.scriptName("aqua")
	.usage('$0 <cmd> [args]')

	.command('compile [paramaters]', 'compiles a system into a cache', (yargs) => {
		yargs.option('cache', {
			type: 'string',
			default: '.cache',
			describe: 'path of the cache'
		})
		yargs.option('index', {
			type: 'string',
			default: 'index.js',
			describe: 'path to the system index'
		})
	}, cliCompile)

	.help()
	.argv;

return;



/// this is the base compile function, that the CLI directly calls.
async function cliCompile(args) {
	const {compile} = require('./compiler.js');
	log.debug(path.isAbsolute(args.index));
	log.debug(args.index);
	log.debug(process.cwd());
	if(!path.isAbsolute(args.index)) args.index = path.join(process.cwd(), args.index);
	if(!path.isAbsolute(args.cache)) args.cache = path.join(process.cwd(), args.cache);


	let index = platformPrecompile(args);
	log.info('precompile completed');
	
	
	compile({
		index: index,
		cache: args.cache
	})
}


/// Do all platform related things to the index file, like substituting
/// CLI arguments, and converting from a filepath to an actual index object.
// TODO make this also do dependencies
function platformPrecompile(args) {
	// if its a path, require the file and create the object.
	if(typeof args.index === 'string') {
		args.index = require(args.index);
	}

	const index = args.index;

	for(const key in args) {
		if(key in index.Parameters) {
			index.Parameters[key] = args[key];
		}
	}

	return index;
}