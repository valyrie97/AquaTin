const {Collexion, Link, LinkArray} = require('./../../core/Collexion.js');
const PingPong = require('./pingpong.js')

;(async () => {
	const collexion = new Collexion({});
	collexion.createInstances({
		'A': {
			Code: PingPong,
			Data: {
				boop: true
			},
			Links: {
				thing: new Link('B')
			}
		},
		'B': {
			Code: PingPong,
			Data: {

			},
			Links: {
				thing: new Link('B')
			}
		}
	})
})();


// const ExampleModule = require('./module.js.js');

// module.exports = {
// 	Entities: {
// 		A: {
// 			Code: ExampleModule,
// 			Data: {
// 				thing: ref('B'),
// 				boop: true
// 			}
// 		},
// 		B: {
// 			Code: ExampleModule,
// 			Data: {
// 				thing: ref('B')
// 			}
// 		}
// 	}
// }

