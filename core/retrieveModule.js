const path = require('path');
const fs = require('fs');


module.exports.retrieveModule = retrieveModule;

function retrieveModule(source, name) {
	return new Promise ((res, rej) => {
		fs.readFile(path.join(source, `${name}.js`), (err, data) => {
			if(err) return rej(err);
			else res(data.toString());
		})
	})
}