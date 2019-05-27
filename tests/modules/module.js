

module.exports.entity = class module {
	async Start() {
		console.log('starting...');
		await new Promise(res => {
			setTimeout(_ => {
				console.log('done');
				res();
			}, 1000);
		})
	}
}

