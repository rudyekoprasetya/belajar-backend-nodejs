const http = require('http');

const requestListener = (req, res) => {
    // res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'NodeJS');
    
    // res.statusCode = 200;

    const {url, method} = req;

    if (url==='/') {
        if(method==='GET'){
            res.statusCode=200;
            // res.end('<h1>Menggunakan GET</h1>');
            res.end(JSON.stringify({
                message:'ini adalah home'
            }));
        } else {
            res.statusCode=400;
            // res.end('<h1>Halaman tidak dapay diakses dengan <any> request</h1>');
            res.end(JSON.stringify({
                message:'laman tidak dapat diakses'
            }));
        }
    } else if (url==='/about') {
        if(method==='GET') {
            res.statusCode=200;
            // res.end('<h1>Halo ini adalah laman About</h1>');
            res.end(JSON.stringify({
                message:'ini adalah about'
            }));
        } else if(method==='POST') {
             //latihan body request
            let body = [];
            req.on('data', (chunk)=>{
                body.push(chunk);
            });

            req.on('end', ()=> {
            body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                res.statusCode=200;
                // res.end(`<h1>Halo ${name} ini adalah laman About</h1>`);
                res.end(JSON.stringify({
                    message:`Halo, ${name} ini adalah laman about`
                }));
             });
        } else {
            res.statusCode=400;
            // res.end('<h1>Halaman tidak dapay diakses dengan <any> request</h1>');
            res.end(JSON.stringify({
                message:'laman tidak dapat diakses'
            }));
        }
    } else {
        res.statusCode=400;
        // res.end('<h1>Halaman Tidak ditemukan</h1>');
        res.end(JSON.stringify({
            message:'Laman tidak ditemukan'
        }));
    }

    
}

const server = http.createServer(requestListener);

const port = 5000;

const host = 'localhost';

server.listen(port, host, () =>{
    console.log(`Server berhasil berjalan http://${host}:${port}`)
})