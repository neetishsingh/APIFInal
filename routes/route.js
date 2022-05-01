/**
 * @author: Jayesh Agrawal
 * @date: 2th Dec 2017 
 * @desc: custom route for fetching data
*/
//custom route for fetching data
var transactions = require('../data_access/transaction');
const firebaseverifytok = require('../utility/firebaseverifytok');
var FirebaseVerifyTok=require('../utility/firebaseverifytok');
const twilio = require('twilio');
module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {

        // adding route for users, here app is express instance which provide use
        // get method for handling get request from http server. 
     
        app.get('/api/users', function (req, res) {
            transactions.getAllUsers(res);
             
        });

        // here we gets id from request and passing to it transaction method.
        app.get('/api/transactions/:id/', function (req, res) {
            transactions.getTransactionById(req.params.id, res);
        });
        app.get('/api/createtoken',function(req,res){

            firebaseverifytok.createToken(res);
            
        });
        app.get('/api/verifytoken/:id/',function(req,res){

           // firebaseverifytok.verifyFBToken(req.params.id,res);
           console.log(req.params.id);
           res.end(req.params.id);
            
        });

        app.get('/api/test',function(req,res){

           // firebaseverifytok.verifyFBToken(req.params.id,res);
            
           firebaseverifytok.verifyFBToken(req.params.id,res);
        });
           
        //verifyFBToken

       
    }

};