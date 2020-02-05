const mysql = require('mysql');
const hostName = 'localhost';
const userName  = 'root';
const password  = '';
const database  = 'crud_db';

const conn = mysql.createConnection({
  host : hostName,
  user : userName,
  password : password,
  database: database

});

// const conn.connect(function(err) {
  //if(err) throw err;
//  console.log('Database connection Success');
//});

 module.exports = conn;