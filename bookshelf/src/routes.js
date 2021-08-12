const {addBook,getBook,getBookFilter,updateBook,hapusBook} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBook
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: getBookFilter
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: updateBook
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: hapusBook
	},
	{
		method: 'GET',
		path: '/books',
		handler: getBook
	},
];


module.exports=routes;