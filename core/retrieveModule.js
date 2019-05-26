const path = require('path');
const fs = require('fs');


module.exports.retrieveModule = retrieveModule;

function retrieveModule(source, name) {
	return new Promise (res => {
		fs.readFile(path.join(source, `${name}.js`), (err, data) => {
			res(data.toString());
		})
	})
}