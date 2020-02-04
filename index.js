//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
//const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');

//---- File Upload Code start
const multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './views/upload');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage}).single('product_image');

const app = express();
//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
//set views file
app.set('views',path.join(__dirname,'views'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set view engine
app.use('/assets',express.static(__dirname + '/public'));
//app.use('/upload',express.static(__dirname + '/public'));
app.use(express.static('./views'));
app.set('view engine', 'hbs');
// app.get('/', function (req, res) {
//   //res.sendFile(__dirname + '/product_view.html');
//   res.render('./product_view');
// })

//route for homepage
// app.get('/',(req, res) => {
//   let sql = "SELECT * FROM product";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.render('product_view',{
//      results: results
//     });
//   });
// });
app.get('/',(req, res) => {
  //console.log(req);
  let sql = "SELECT * FROM product";
  let query = conn.query(sql,(err, results) => {
  console.log(results);
   if(err) throw err;
     res.render('./product_view',{
     results: results
     });
  });
});
/*Image code*/
app.post('/save',function (req, res) {
    upload(req,res,function(err) {
	  if(err) {
	      res.send('Error in File Uploading....');
	  }
	 
  let data = {product_name: req.body.product_name, product_price: req.body.product_price,product_image:req.file.originalname};
  //console.log(data);
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
    
  });
})
});

//route for insert data
app.post('/update',(req, res) => {
  //console.log(req.file);
   upload(req,res,function(err) {
	  if(err) {
	      res.send('Error in File Uploading....');
	  }
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"',product_price='"+req.body.product_price+"',product_image='"+req.file.originalname+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/');
    
  });
});
});
//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  console.log(req.body.product_id);
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
app.listen(8000);
