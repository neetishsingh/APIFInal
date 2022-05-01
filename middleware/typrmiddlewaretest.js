

var connection = require('../connection/MySQLConnect');
var app=require("../server");
var FirebaseUser=require("../data_access/FirebaseUser");

var express = require('express');
var bodyparser = require('body-parser');
const firebaseverifytok = require('../utility/firebaseverifytok');


const {mUsers} = require('../Models/mUsers');

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {



        app.use((req, res,next)=>{
            console.log('firstd middleware');


           
   next();
        
         });   

        },

        testa: function (app) {



            app.use((req, res,next)=>{
                if(req.user1==null)console.log("ye kaa ho rha");
                console.log(req.user1);
    
    
               
       next();
            
             });   
    
            },




//to check if user is there or not if not create else return user.
   authenticate:function(app){ 
       
   //this will take the authentication from header and if the authentication token is right then return user else it will rpompt error
    app.use((req, res,next)=>{
        console.log('authentication middleware');
      
        

           authheader =new Buffer.from(req.headers.authorization).toString('ascii');
    console.log(authheader);

    if(req.headers.authorization==null){
      
        console.log("typpppppppppppppppppppppppppppppppppoooooooooo");
        var err = new Error('You need to send tokens').message;
        err.status=401;
        res.status(401).json({ error: err });
        
        //res.end(JSON.stringify({"Error":err})); 
       
    }else{



        firebaseverifytok.getTokenDecodedData(authheader).then((DecodedIdToken)=>{
           // console.log(DecodedIdToken.uid+"this is soi");
            //if not in db then enter it and get userid
            adata="";
            //else get the userid

           async function createUserNew(){
  try{
  result=await FirebaseUser.createNewUserFromFirebase(new mUsers(null,1,0,1,1,null,DecodedIdToken.phone_number,DecodedIdToken.uid,null,null,null,null,null ),res);
  
  console.log(result);



  }catch(re){console.log(re)}

           }




            async function akela(){
                result="";
                try{  result = await FirebaseUser.getUsersfromId(DecodedIdToken.uid,res);
                console.log(result.length+"<<<result");

                if(result.length>0){

                    console.log("user already there so returning data");
///already existing
req.user1=result[0];
next();

                }else{
                    console.log("entry done");
                    const ab=new mUsers(null,1,0,1,1,null,DecodedIdToken.phone_number,DecodedIdToken.uid,null,null,null,null,null );
        
                   //await  FirebaseUser.createNewUserFromFirebase(new mUsers(null,1,0,1,1,null,DecodedIdToken.phone_number,DecodedIdToken.uid,null,null,null,null,null ),res).then((value)=>{
                     //   console.log(value);
                    //}).catch((ey)=>{
//console.log(ey);
                    //});
                    createUserNew().then(async ()=>{
                        req.user1=await akela();
                        console.log("badhoiua");
                        next();
                    })
                   
                    //console.log("tttgsssdv"+adata);
                   // res.status(200).json(adata);

                   // req.user1=null//await akela();
                    
                    console.log("user new so creating one");
                 

                }
             //result=;
            }
                catch(e){
                    console.log(e);
                    
        res.status(401).json({ error: e });
                }
                return result[0];

            }
            //adata=
            akela();
        //    FirebaseUser.getUsersfromId(DecodedIdToken.uid,res).then((value)=>{
      //          console.log(value);
    //            adata=value
  //              console.log("tttgsssdv"+adata);
//            });

            //console.log("authsuccessful");
            //const ab=new mUsers(null,1,0,1,1,null,DecodedIdToken.phone_number,DecodedIdToken.uid,null,null,null,null,null );

            //FirebaseUser.createNewUserFromFirebase(ab,res);
            //console.log("tttgsssdv"+adata);
          //  res.status(200).json(adata);

        }).catch((err)=>{

            
            console.log("err");
        res.status(401).json({ error: err });
        })
        


       // var err = new Error('Something wrong with the request').message;
        //err.status=401;
       // res.status(401).json({ error: err });
    }


 


    
     });  

    
   }      
        





   


}