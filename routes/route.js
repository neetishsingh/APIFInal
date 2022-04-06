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

            firebaseverifytok.verifyFBToken(req.params.id,res);
            
        });
           
        //verifyFBToken

        app.get('/api/sendsms',function(req,res){
            const accountSid = 'AC7c1dc894678c9e41663a961866f3b63f'; // Your Account SID from www.twilio.com/console
            const authToken = '18e5ee27a104adc80ce7919a543bde8b'; // Your Auth Token from www.twilio.com/console
            
            const twilio = require('twilio');
            const client = new twilio(accountSid, authToken);
            
            client.messages
              .create({
                body: 'Hello from Node',
                to: '+919643046366', // Text this number
                from: '+18563515088', // From a valid Twilio number
              })
              .then((message) => console.log(message.sid));
            
        });
    }

};