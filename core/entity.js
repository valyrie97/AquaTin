const {Signale} = require('signale');
const log = new Signale({
	scope: 'ENTITY'
});

module.exports.Entity = class Entity {
	constructor(userCode, instanceData = {}, systemPtr) {
		this.systemPtr = systemPtr;
		this.instanceData = instanceData;
		this.data = this.instanceData.data || {};
		this.userCode = userCode;
		this.instance = new this.userCode();
		const that = this;
		Object.defineProperty(this.instance, 'data', {
			get() {
				return that.data;
			}
		});
		Object.defineProperty(this.instance, 'send', {
			value: ((name, destination, options) => {
				//anti call stack measure
				setTimeout(_ => {
					this.systemPtr.send(name, destination, options);
				}, 0)
			}).bind(that)
		});
	}

	

	start() {
		this.systemPtr.send('start', this.instanceData._id);
	}

	dispatch(name, options) {
		
		if(name in this.instance)
			this.instance[name](options);
		
		else if('*' in this.instance)
			this.instance['*'](options);

		else log.warn(`method ${name} does not exist for ${this.instanceData._id}`);
	}
}