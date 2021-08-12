// import plugin nanoid
const {nanoid} = require('nanoid');
// import book interface
const books = require('./books');

//add book
const addBook=(req,h)=>{
	const {name,year,author,summary,publisher,pageCount,readPage,reading} = req.payload;

	const id=nanoid(16);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const finished = (pageCount===readPage) ? true : false; 
	
	if(name===undefined) {
		const res = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku'
		});
		res.code(400);
		return res;
	} else if(readPage>pageCount) {
		const res = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
		});
		res.code(400);
		return res;
	} else {		
		//memasukan data 
		const newData = {
			id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
		}
		
		books.push(newData);

		const isSuccess = books.filter((n)=>n.id===id).length>0;

		if(isSuccess) {
			const res = h.response({
				status: 'success',
				message: 'Buku berhasil ditambahkan',
				data: {
					bookId:id,
				}
			});
			res.code(201);
			return res;
		} else {
			const res=h.response({
				status: 'error',
				message: 'Buku gagal ditambahkan'
			});
			res.code(500);
			return res;
		}
	}

}

const getBook=(req,h)=>{

	const {name}=req.query;
	const {reading}=req.query;
	const {finished}=req.query;


	if(name!==undefined) {
		const book = books.filter(n=>n.name.toLowerCase().includes(name));
		return {
			status : 'success',
			data: {
				books:book.map((n)=>({
					id:n.id,
					name:n.name,
					publisher:n.publisher
				}))
			}
		}
	} 
	if (reading!==undefined) {
		if (reading==='1') {
			const book = books.filter((n)=>n.reading===true);
			return {
				status : 'success',
				data: {
					books:book.map((n)=>({
					id:n.id,
					name:n.name,
					publisher:n.publisher
				}))
				}
			}
		} else {
			const book = books.filter((n)=>n.reading===false);
			return {
				status : 'success',
				data: {
					books:book.map((n)=>({
					id:n.id,
					name:n.name,
					publisher:n.publisher
				}))
				}
			}
		}
	}
	if(finished!==undefined) {
		if (finished==='1') {
			const book= books.filter((n)=>n.finished===true);
			return {
				status : 'success',
				data: {
					books:book.map((n)=>({
					id:n.id,
					name:n.name,
					publisher:n.publisher
				}))
				}
			}
		} else {
			const book = books.filter((n)=>n.finished===false);
			return {
				status : 'success',
				data: {
					books:book.map((n)=>({
					id:n.id,
					name:n.name,
					publisher:n.publisher
				}))
				}
			}
		}
	} 

	//tanpa query
	return {
			status: 'success',
			data: {
				books:books.map((book)=>({
					id:book.id,
					name:book.name,
					publisher:book.publisher
				}))
			}
		}
	
};

const getBookFilter=(req,h)=>{
	const {id}=req.params;
	const book=books.filter((n)=>n.id===id)[0];

	if(book!==undefined) {
		return {
			status: 'success',
			data: {
				book
			}
		}
	} else {
		const res=h.response({
			status: 'fail',
			message: 'Buku tidak ditemukan'
		});
		res.code(404);
		return res;
	}
};

const updateBook=(req,h) => {
	const {id}=req.params;

	const {name,year,author,summary,publisher,pageCount,readPage,reading} = req.payload;

	const updatedAt = new Date().toISOString();
	const finished = (pageCount===readPage) ? true : false;

	if(name===undefined) {
		const res = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku'
		});
		res.code(400);
		return res;
	} else if(readPage>pageCount) {
		const res = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
		});
		res.code(400);
		return res;
	} else {
		//ubah datanya sesuai dengan id
		const index = books.findIndex((n) =>n.id===id);
		if(index !== -1) {
			books[index] = {
				...books[index],
				name, 
				year, 
				author, 
				summary, 
				publisher, 
				pageCount, 
				readPage, 
				finished, 
				reading, 
				updatedAt
			}

			const res = h.response({
				status: 'success',
				message: 'Buku berhasil diperbarui'
			});

			res.code(200);
			return res;
		} else {
			//jika gagal
			const res=h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Id tidak ditemukan'
		});
		res.code(404);
		return res;
		}
	}

};

const hapusBook=(req,h) => {
	const {id}=req.params;
	const index = books.findIndex((n) =>n.id===id);

	//hapus data di array
	if(index !== -1) {
		books.splice(index,1);
		const res=h.response({
			status: 'success',
			message: 'Buku berhasil dihapus'
		});
		res.code(200);
		return res;
	} else {
		const res=h.response({
			status: 'fail',
			message: 'Buku gagal dihapus. Id tidak ditemukan'
		});
		res.code(404);
		return res;
	}
};


module.exports={addBook,getBook,getBookFilter,updateBook,hapusBook};