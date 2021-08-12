const {addNote,getNote,getNotebyID,editNote,hapusNote} = require('./handler');

const routes = [
	{
			method: 'POST',
			path: '/notes',
			handler:addNote
	},
	{
			method: 'GET',
			path: '/notes/{id}',
			handler:getNotebyID
	},
	{
			method: 'PUT',
			path: '/notes/{id}',
			handler:editNote
	},
	{
			method: 'DELETE',
			path: '/notes/{id}',
			handler:hapusNote
	},
	{
			method: 'GET',
			path: '/notes',
			handler:getNote
	}
];


module.exports=routes;