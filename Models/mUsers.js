
class mUsers{
    // rt=1;
   // id,isphoneverified,isemailverified,isactive,phase;
     //name,phone,firebaseuid,email,gender,profilepicture,createdDate,updatedDate;


//mUsers(){}

constructor(id=null,isphoneverified=0,isemailverified=0,isactive=0,phase=0, name="user",phone="123467",firebaseuid="XXX",email="xxx@xxx.com",gender="male",profilepicture="profilepicurl",createdDate="324",updatedDate="22") {
    this.name = name;
    this.id=id;
    this.isphoneverified=isphoneverified;
    this.createdDate=createdDate;
    this.isemailverified=isemailverified;
    this.isactive=isactive;
    this.phase=phase;
    this.phone=phone;
    this.profilepicture=profilepicture;
    this.firebaseuid=firebaseuid;
    this.email=email;
    this.gender=gender;
    this.updatedDate=updatedDate;
    
  }
   // `id`, `name`, `phone`, `isphoneverified`, `firebaseuid`, `email`, `isemailverified`, `isactive`, `gender`, `profilepicture`, `phase`, `createdDate`, `updatedDate`;

}
module.exports = {
    mUsers,
  };
