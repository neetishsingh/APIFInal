
var connection = require('../connection/MySQLConnect');
//import mUsers from '../Models/mUsers';
const {mUsers} = require('../Models/mUsers');
//Svar mUsers = require('../Models/mUsers');

//var mUsers=require("../Models/mUsers");
function FirebaseUser(){
///check if user exists
//import mUsers from '../Models/mUsers';

//step1: get the data
//step2: check if that uid customer exists or not
//if(exist): getits user id
//if not exists: create one user & get it's id

//const ab=new mUsers();



this.createNewUserFromFirebase = function (ab, res) {//create new user when phone otp is successful
    // initialize database connection
    //import "../Models/mUsers";
    //import mUsers from '../Models/mUsers';
    //Ad=new mUsers();
    connection.init();
    // get id as parameter to passing into query and return filter data
    
return new Promise((resolve, reject) => {
    connection.acquire(function (err, con) {
        var query = 'INSERT INTO `musers`( `name`, `phone`, `isphoneverified`, `firebaseuid`, `email`, `isemailverified`, `isactive`, `gender`, `profilepicture`, `phase`, `createdDate`, `updatedDate`)'+
        ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';
        console.log(query);
        console.log(ab.phone);
        con.query(query, [ab.name,ab.phone,ab.isphoneverified,ab.firebaseuid,ab.email,ab.isemailverified,ab.isactive,ab.gender,ab.profilepicture,ab.phase,ab.createdDate,ab.updatedDate], function (err, result) {
            console.log(err);    
            con.release();
           console.log(result);
           resolve(result);
               // res.send(result); 
            });
        });
    });
}; 

   
this.getUsersfromId =  function (token,res) {
    //return 11;

    apacola="";
    // initialize database connection
    connection.init();
    // calling acquire methods and passing callback method that will be execute query
    // return response to server
//await 23;
return new Promise((resolve, reject) => {
     connection.acquire(async function (err, con) {
         //await "11";
        // return 23;
        //resolve(11);
         await con.query('SELECT DISTINCT * FROM `musers` where firebaseuid=?',[token],async function (err, result) {

            if(err){
                console.log("bawal");
                reject(err);
            }
            con.release();
           // console.log("ander se"+result[0].id);

         // apacola=  result;
          //console.log(apacola);
          resolve(result);
          //await result;
            //res.send(result);
        });
  
    });
});
  //return await  apacola;

};



//old to be replaced
    this.getAllUsers = function (token,res) {
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

   
   //




}

module.exports = new FirebaseUser();