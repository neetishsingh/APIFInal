const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

//import { signInWithCustomToken } = require('firebase-admin/auth');


const admin = require('firebase-admin');


function FirebaseVerifyTok() {
    var serviceAccount = require("../assetsfile/traderex-aaab1-firebase-adminsdk-5eb4u-2c116294ab.json");
    

    initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "firebase-adminsdk-y9lnw@covidhelp-68308.iam.gserviceaccount.com"
    });

  //  const { initializeApp } = require("firebase-admin/app");


  this.createToken=function(res){
    const uid = 'n5nGM1OklyXzyaUR91ZnthW35hG3';
    
    getAuth()
      .createCustomToken(uid)
      .then((customToken) => {
        // Send token back to client
        console.log(customToken);
        
        res.send(customToken);
    
      })
      .catch((error) => {
        console.log('Error creating custom token:', error);
        
        res.send(error);
      });
  };

  this.verifyFBToken=function(token,res){

    getAuth()
  .verifyIdToken(token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    res.send(uid);
    // ...
  })
  .catch((error) => {
    // Handle error
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+errorMessage);
  });

   /* const auth = getAuth();
    auth.signInWithCustomToken()
    auth.signInWithCustomToken(auth, token).then((userCredential) => {
    // Signed in
    const user = userCredential.user;*/
    //res.send(user);
    // ...
  
  

  //  getAuth()
  //  .verifyIdToken(token)
  //  .then((decodedToken) => {
  //    const uid = decodedToken.uid;
  //    console.log(uid);
      // ...
   // })
   // .catch((error) => {
      // Handle error
   //   console.log(error);
  //  });
    res.send("ddd");

  };
}


module.exports = new FirebaseVerifyTok();