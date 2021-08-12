const {nanoid} = require('nanoid');
// import notes
const notes = require('./notes');

// tambah catatan
const addNote=(req,h) =>{
	const {title,tags,body} = req.payload;

	// generate id
	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;

	//memasukan ke array
	const newData = {
		title, tags, body, id, createdAt, updatedAt
	};

	notes.push(newData);

	//konfirmasi
	const isSuccess = notes.filter((note)=>note.id===id).length>0;

	if(isSuccess) {
		const res = h.response({
			status: 'success',
			message: 'Catatan berhasil ditambahkan',
			data: {
				noteId:id,
			}
		});
		res.code(201);
		return res;
	} else {
		const res=h.response({
			status: 'fail',
			message: 'Catatan gagal ditambahkan'
		});
		res.code(500);
		return res;
	}

};

//tampil data
const getNote=() =>({
	status: 'success',
	data: {
		notes,
	}
});

// filter
const getNotebyID=(req,h)=>{
	const {id}=req.params;
	const note=notes.filter((n)=>n.id===id)[0];

	// konfirmasi
	if(note !== undefined) {
		return {
			status: 'success',
			data: {
				note
			}
		}
	} else {
		const res=h.response({
			status: 'fail',
			message: 'Catatan tidak ditemukan'
		});
		res.code(404);
		return res;
	}
}

//ubah data
const editNote = (req,h) =>{
	const {id}=req.params;

	const {title,tags,body}=req.payload;

	const updatedAt=new Date().toISOString();

	//ubah datanya sesuai dengan id
	const index = notes.findIndex((note) =>note.id===id);

	//konfirmasi
	if(index !== -1) {
		notes[index] ={
			...notes[index],
			title,
			tags,
			body,
			updatedAt
		};

		const res = h.response({
			status: 'success',
			message: 'Catatan berhasil diubah'
		});

		res.code(200);
		return res;
	} else {
		const res=h.response({
			status: 'fail',
			message: 'Catatan tidak ditemukan'
		});
		res.code(404);
		return res;
	}
}

//hapus data
const hapusNote = (req,h) => {
	const {id}=req.params;
	const index = notes.findIndex((note) =>note.id===id);

	//hapus data di array
	if(index !== -1) {
		notes.splice(index,1);
		const res=h.response({
			status: 'success',
			message: 'Catatan berhasil dihapus'
		});
		res.code(200);
		return res;
	} else {
		const res=h.response({
			status: 'fail',
			message: 'Catatan gagal dihapus'
		});
		res.code(404);
		return res;
	}
}



module.exports={addNote, getNote, getNotebyID, editNote, hapusNote};