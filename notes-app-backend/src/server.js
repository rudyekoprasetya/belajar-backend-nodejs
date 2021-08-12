const Hapi = require('@hapi/hapi');
// import routes
const routes = require('./routes');

const init = async() =>{
	const server = Hapi.server({
		port: 5000,
		host: 'localhost',
		routes: {
			cors: {
				origin: ['*']
			}
		}
	});

	//routes config
	server.route(routes);


	await server.start();
	console.log(`Server run at ${server.info.uri}`);

}

init();