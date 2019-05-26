#!/usr/bin/env node
const args = require('yargs').argv
const path = require('path');
const {compile} = require('./compiler.js');
args.index = args.index || path.join(process.cwd(), 'index.js');
args.cache = args.cache || path.join(process.cwd(), '.cache');

console.log('a')
let index = platformPrecompile();
console.log('a')
index = compileParameters(index);
console.log('a')
index = compileLinks(index);
console.log('a')

compile({
	index: index,
	cache: args.cache
})
console.log('a')


/// Do all platform related things to the index file, like substituting
/// CLI arguments, and converting from a filepath to an actual index object.
// TODO make this also do dependencies
function platformPrecompile() {
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
	// TODO implement links

	let entities = index.Entities;

	for(const key in index.Parameters) {
		entities = recursiveReplace(entities, `\$${key}`, index.Parameters[key]);
	}

	return {
		Entities: entities
	};
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