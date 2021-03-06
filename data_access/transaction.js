/**
 * @author: Jayesh Agrawal
 * @date: 2th Dec 2017 
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data
var connection = require('../connection/MySQLConnect');

function Transaction() {

    // get all users data 
    this.getAllUsers = function (res) {
        // initialize database connection
        connection.init();
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 
        connection.acquire(function (err, con) {
            con.query('SELECT DISTINCT * FROM users', function (err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getTransactionById = function (id, res) {
        // initialize database connection
        connection.init();
        // get id as parameter to passing into query and return filter data
        connection.acquire(function (err, con) {
            var query = 'SELECT date_format(t.TransactionDate,\'%d-%b-%Y\') as date, ' +
                'CASE WHEN t.TransactionAmount >= 0 THEN t.TransactionAmount ' +
                'ELSE 0 END AS Credit, CASE WHEN t.TransactionAmount < 0 THEN ' +
                't.TransactionAmount ELSE 0 END AS Debit, t.Balance FROM ' +
                'transactions t INNER JOIN users u ON t.UserId=u.UserID WHERE t.UserId = ?;';
            con.query(query, id, function (err, result) {
                    con.release();
                    res.send(result); 
                });
        });
    };

}

module.exports = new Transaction();