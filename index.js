const mysql = require('mysql');
const diff = require('diff');
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
upload = require("express-fileupload");
const md5 = require("md5")
const moment = require("moment")


app.use(upload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.listen(8000, () => {
    console.log("Server run on port 8000");
});

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_mobil'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded')
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

//read
app.get('/karyawan', (req, res) => {
    mysqlConnection.query('SELECT * FROM keryawan ORDER BY id_karyawan', (err, rows, fields) => {
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                karyawan: rows
            }
        }
        res.json(response)
    });
});

app.get('/karyawan/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM keryawan WHERE id_karyawan = ?', [req.params.id], (err, rows, fields) => {
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                karyawan: rows
            }
        }
        res.json(response)
    });
});

//delete
app.delete('/karyawan/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM keryawan where id_karyawan = ?', [req.params.id], (err, rows, fields) => {
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                message: rows.affectedRows + " data dihapus"
            }
        }
        res.json(response)
    });
});

app.post('/karyawan', (req, res) => {
    let id = req.body.id;
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let kontak = req.body.kontak;
    let username = req.body.username;
    let password = md5(req.body.password);


    mysqlConnection.query('INSERT INTO keryawan (id_karyawan,nama_karyawan,alamat_karyawan,kontak,username,password) VALUES(?,?,?,?,?,?)'
        , [id, nama, alamat, kontak, username, password], (err, rows, fields) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data ditambahkan"
                }
            }
            res.json(response)
        });
});

app.put('/karyawan', (req, res) => {
    let id = req.body.id;
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let kontak = req.body.kontak;
    let username = req.body.username;
    let password = md5(req.body.password);

    mysqlConnection.query('UPDATE keryawan SET nama_karyawan=?,alamat_karyawan=?,kontak=?,username=?,password=? where id_karyawan=?'
        , [nama, alamat, kontak, username, password, id], (err, rows, fields) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data diedit"
                }
            }
            res.json(response)
        });
});
/*====================================================================================================================
=====================================================================================================================*/

//read
app.get('/mobil', (req, res) => {
    mysqlConnection.query('SELECT * FROM mobil ORDER BY id_mobil', (err, rows, fields) => {
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                mobil: rows
            }
        }
        res.json(response)
    });
});

app.get('/mobil/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM mobil WHERE id_mobil = ?', [req.params.id], (err, rows, fields) => {
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                mobil: rows
            }
        }
        res.json(response)
    });
});

//delete
app.delete('/mobil/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM mobil where id_mobil = ?', [req.params.id], (err, rows, fields) => {
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                message: rows.affectedRows + " data dihapus"
            }
        }
        res.json(response)
    });
});

app.post('/mobil', (req, res) => {
    let id = req.body.id;
    let nomor = req.body.nomor;
    let merk = req.body.merk;
    let jenis = req.body.jenis;
    let warna = req.body.warna;
    let tahun = req.body.tahun;
    let biaya = req.body.biaya;
    if (req.files) {
        var file = req.files.filename,
            filename = file.name;
        file.mv("./upload/" + filename, function (err) {
            if (err) {
                console.log(err)
                res.send("error")
            } else {
                mysqlConnection.query('INSERT INTO mobil (id_mobil,nomor_mobil,merk,jenis,warna,tahun_pembuatan,biaya_sewa_per_hari,image) VALUES(?,?,?,?,?,?,?,?)'
                    , [id, nomor, merk, jenis, warna, tahun, biaya, filename], (err, rows) => {
                        let response = null
                        if (err) {
                            response = {
                                message: err.message
                            }
                        } else {
                            response = {
                                message: rows.affectedRows + " data ditambahkan"
                            }
                        }
                        res.json(response)
                    })
            }
        })
    }
});

app.put('/mobil', (req, res) => {
    let id = req.body.id;
    let nomor = req.body.nomor;
    let merk = req.body.merk;
    let jenis = req.body.jenis;
    let warna = req.body.warna;
    let tahun = req.body.tahun;
    let biaya = req.body.biaya;

    if (req.files) {
        var file = req.files.filename,
            filename = file.name;
        file.mv("./upload/" + filename, function (err) {
            if (err) {
                console.log(err)
                res.send("error")
            } else {
    mysqlConnection.query('UPDATE mobil SET nomor_mobil=?, merk=?, jenis=?, warna=?, tahun_pembuatan=?, biaya_sewa_per_hari=?, image=? where id_mobil=?'
        ,[nomor, merk, jenis, warna, tahun, biaya, filename, id], (err, rows, fields) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data diedit"
                }
            }
            res.json(response)
        })
    }
})
}
});

/*====================================================================================================================
=====================================================================================================================*/


app.get('/pelanggan',(req,res)=>{
    mysqlConnection.query('SELECT * FROM pelanggan',(err, rows, fields)=>{
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                pelanggan: rows
            }
        }
        res.json(response)
    });
});

app.get('/pelanggan/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM pelanggan WHERE id_pelanggan=?',[req.params.id],(err, rows, fields)=>{
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                pelanggan: rows
            }
        }
        res.json(response)
    });
});

app.delete('/pelanggan/:id',(req,res)=>{
    mysqlConnection.query('delete FROM pelanggan WHERE id_pelanggan = ?',[req.params.id],(err, rows, fields)=>{
        let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data dihapus"
                }
            }
            res.json(response)
    });
});

app.post('/pelanggan', (req, res) => {
    let id = req.body.id;
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let kontak = req.body.kontak;
    
    mysqlConnection.query('INSERT INTO pelanggan (id_pelanggan,nama_pelanggan,alamat_pelanggan,kontak) VALUES(?,?,?,?)'
        , [id, nama, alamat, kontak], (err, rows, fields) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data ditambahkan"
                }
            }
            res.json(response)
        });
});

app.put('/pelanggan', (req, res) => {
    let id = req.body.id;
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let kontak = req.body.kontak;

    mysqlConnection.query('UPDATE pelanggan SET nama_pelanggan=?,alamat_pelanggan=?,kontak=? where id_pelanggan=?'
        , [nama, alamat, kontak, id], (err, rows, fields) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data diedit"
                }
            }
            res.json(response)
        });
});
//read


    
    app.post("/sewa",(req,res)=>{
        var a = moment(req.body.tgl_sewa) //mengambil tanggal sewa menggunakan format moment Moment<2020-02-01T00:00:00+07:00>
        var b = moment(req.body.tgl_kembali) // mengambil tanggal kembali mengguankan format moment
        var hari = b.diff(a, 'days');
        
        let id_mobil = {
            id_mobil:req.body.id_mobil
        }

        mysqlConnection.query('SELECT biaya_sewa_per_hari FROM mobil WHERE ?',id_mobil,(err,rows) => {
            var string=JSON.stringify(rows);
            var json   =  JSON.parse(string); 

         var total = json[0].biaya_sewa_per_hari*hari;

            let data = {
             id_sewa: req.body.id_sewa,
             id_mobil: req.body.id_mobil,
             id_karyawan: req.body.id_karyawan,
             id_pelanggan: req.body.id_pelanggan,
             tgl_sewa: req.body.tgl_sewa,
             tgl_kembali: req.body.tgl_kembali,
             total_bayar: total
            }

        mysqlConnection.query('insert into sewa set ?'
        , data, (err, rows, fields) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                response = {
                    message: rows.affectedRows + " data ditambah"
                }
            }
            res.json(response)
        }
        )}
    )});

app.get("/sewa",(req,res)=>{
    let sql = "select * from sewa"

    mysqlConnection.query(sql,(err,rows,field)=>{
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                mobil: rows
            }
        }
        res.json(response)
    })
})

app.get("/detail_sewa",(req,res)=>{
    let sql = "SELECT s.id_sewa,p.id_pelanggan,p.nama_pelanggan,m.id_mobil,m.nomor_mobil,m.merk,k.id_karyawan,k.nama_karyawan " +
    "FROM sewa s JOIN pelanggan p ON s.id_pelanggan = p.id_pelanggan "+
    "JOIN mobil m ON s.id_mobil = m.id_mobil " +
    "JOIN keryawan k ON s.id_karyawan = k.id_karyawan"

    mysqlConnection.query(sql,(err,rows,field)=>{
        let response = null
        if (err) {
            response = {
                message: err.message
            }
        } else {
            response = {
                count: rows.length,
                mobil: rows
            }
        }
        res.json(response)
    })
})

app.get("/sewa/:id",(req,res)=>{
    let data = {
        id_pelanggan: req.params.id
    }

    let sql = "SELECT p.id_pelanggan,s.id_sewa,p.nama_pelanggan,m.id_mobil,m.nomor_mobil,m.merk,k.id_karyawan,k.nama_karyawan " +
    "FROM sewa s JOIN pelanggan p ON s.id_pelanggan = p.id_pelanggan "+
    "JOIN mobil m ON s.id_mobil = m.id_mobil " +
    "JOIN keryawan k ON s.id_karyawan = k.id_karyawan WHERE p.?"

    mysqlConnection.query(sql,data,(err,rows)=>{
        let response=null
        if(err){
            response = {
                message: err.message
            }
        }else{
            response = {
                count: rows.length,
                data: rows
            }
        }

        res.json(response)
    })
})

app.delete("/sewa/:id",(req,res)=>{
    let data = {
        id_sewa: req.params.id
    }

    let sql = "DELETE FROM sewa WHERE ?"
    mysqlConnection.query(sql,data,(err,rows)=>{
        let response=null
        if(err){
            response = {
                message: err.message
            }
        }else{
        response = {
            message: rows.affectedRows + " data deleted"
        }
        res.json(response)
    }
    })
})