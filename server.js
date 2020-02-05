const express = require('express');
const conn = require('./include/db.js');
const upload = require('./fileupload.js');
const router = express.Router();
router.get('/',(req, res) => {
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
router.post('/save',function (req, res) {
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
router.post('/update',(req, res) => {
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
router.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  console.log(req.body.product_id);
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
module.exports = router;
