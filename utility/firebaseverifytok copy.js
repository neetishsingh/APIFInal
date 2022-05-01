const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

//import { signInWithCustomToken } = require('firebase-admin/auth');


const admin = require('firebase-admin');


function FirebaseVerifyTok() {
    var serviceAccount = require("../assetsfile/covidhelp-68308-firebase-adminsdk-y9lnw-bb4a06bb25.json");
    

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
      return;
  };

   this.getTokenDecodedData=function(token){
    console.log(token);
    
    getAuth()
  .verifyIdToken(token)
  .then((decodedToken) => {
       console.log(decodedToken);
    const uid = decodedToken.uid;
      return uid;
    // res.send(uid);
    // ...
  })
  .catch((error) => {
    // Handle error
    console.log("///////////////////");
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+errorMessage);
   // res.send(uid);
    //var err = new Error('Something wrong with the request f').message;
      //  err.status=401;
     // return null;
      //  res.status(401).json({ error: errorCode });
        //res.end("hyhh");
        //res.next();
  });
return null;
  
   };

  this.verifyFBToken=function(token,res){
   console.log(token);
    getAuth()
  .verifyIdToken(token)
  .then((decodedToken) => {
       console.log(decodedToken);
    const uid = decodedToken.uid;
    res.send(uid);
    // ...
  })
  .catch((error) => {
    // Handle error
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+errorMessage);
    res.send(uid);
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
    //res.send("ddd");
  };
}


module.exports = new FirebaseVerifyTok();