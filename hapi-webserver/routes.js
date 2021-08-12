const routes = [
	{
		method: 'GET',
		path: '/',
		handler: (req,h) =>{
			return 'Laman Home';
		}
	},
	{
		method: '*',
		path: '/',
		handler: (req,h) =>{
			return 'Laman tidak bisa diakses';
		}
	},
	{
		method: 'GET',
		path: '/about',
		handler: (req,h) =>{
			return 'Laman about';
		}
	},
	{
		method: '*',
		path: '/about',
		handler: (req,h) =>{
			return 'Laman tidak bisa diakses';
		}
	},
	{
		method: 'GET',
		path: '/halo/{nama?}',
		handler: (req,h) =>{
			// path parameter
			const {nama = "anonim"} = req.params;
			//parameter query
			const {lang} = req.query;

			if(lang==='id') {
				return `Halo, ${nama}!`;
			} else {
				return `Hello, ${nama}!`;

			}
		}
	},
	{
		method: '*',
		path: '/{any*}',
		handler: (req,h) =>{
			return 'Laman tidak ditemukan';
		}
	}
]

module.exports=routes;