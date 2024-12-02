const validator = require("validator");
 
const validateSignupData = (req) =>{
 
       const {firstName,lastName, email,password} = req.body;
 
       if(!firstName || !lastName){
        throw new Error("firstName lastName is required");  //do it here or do it mongoose
       }
       else if(!validator.isEmail(email)){
           throw new Error("Email is not valid");
       }
       else if(!validator.isStrongPassword(password)){
           throw new Error("Password should be strong")
       }
}
 
module.exports = {
    validateSignupData,
} 