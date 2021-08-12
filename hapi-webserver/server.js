const Hapi = require('@hapi/hapi');
// import routes
const routes = require('./routes');

const init = async ()=> {
	const server = Hapi.server({
		port: 5000,
		host: 'localhost'
	});

	//setting routing
	server.route(routes);

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);

}

init();