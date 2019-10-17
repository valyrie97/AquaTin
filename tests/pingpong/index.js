const {Collexion, Link, LinkArray} = require('./../../core/Collexion.js');
const PingPong = require('./pingpong.js')

;(async () => {
	const collexion = new Collexion({
		A: {
			Code: PingPong,
			Data: {
				start: true,
				boop: 'B'
			}
		},
		B: {
			Code: PingPong,
			Data: {
				boop: 'A'
			}
		}
	});
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

