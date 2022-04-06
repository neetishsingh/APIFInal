
/**
 * @author: Jayesh Agrawal
 * @date: 2th Dec 2017 
 * @desc: establish Mysql Connection.
*/
// establish Mysql Connection.
var mysql = require('mysql');


var fs = require('file-system');
function MySQLConnect() {
  this.pool = null;
  // Init MySql Connection Pool
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host     : 'rexoracluster-do-user-11150778-0.b.db.ondigitalocean.com',
      user     : 'doadmin',
      password : 'Jasmine@63666366',
      database: 'defaultdb',
      port:25060,
      //ssl : {
        //ca : fs.readFileSync( __dirname  +'\\ca-certificate.crt')
    //}
    });
  };

  // acquire connection and execute query on callbacks
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      console.log(err);
      callback(err, connection);
      
    });
  };
}

module.exports = new MySQLConnect();
