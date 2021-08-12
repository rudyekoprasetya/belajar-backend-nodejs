const http = require('http');

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    const {url, method} = req;

    if (url==='/') {
        if(method==='GET'){
            res.end('<h1>Menggunakan GET</h1>');
        } else {
            res.end('<h1>Halaman tidak dapay diakses dengan <any> request</h1>');
        }
    } else if (url==='/about') {
        if(method==='GET') {
            res.end('Halo ini adalah laman About');
        } else if(method==='POST') {
                //latihan body request
            let body = [];
            req.on('data', (chunk)=>{
                body.push(chunk);
            });

            req.on('end', ()=> {
            body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                res.end(`<h1>Halo ${name} ini adalah laman About</h1>`);
             });
        } else {
            res.end('<h1>Halaman tidak dapay diakses dengan <any> request</h1>');
        }
    } else {
        res.end('<h1>Halaman Tidak ditemukan</h1>');
    }

    // if(method === 'GET') {
    //     res.end('<h1>Menggunakan GET</h1>');
    // } else if (method === 'POST') {
    //     //latihan body request
    //     let body = [];
    //     req.on('data', (chunk)=>{
    //         body.push(chunk);
    //     });

    //     req.on('end', ()=> {
    //         body = Buffer.concat(body).toString();

    //         const {name} = JSON.parse(body);
    //         res.end(`<h1>POST data ${name}</h1>`);
    //     });
        
    // } else if (method === 'PUT') {
    //     res.end('<h1>Menggunakan PUT</h1>');
    // } else if (method === 'DELETE') {
    //     res.end('<h1>Menggunakan DELETE</h1>');
    // } else {
    //     res.end('<h1>Salah method</h1>');
    // }

    
}

const server = http.createServer(requestListener);

const port = 5000;

const host = 'localhost';

server.listen(port, host, () =>{
    console.log(`Server berhasil berjalan http://${host}:${port}`)
})