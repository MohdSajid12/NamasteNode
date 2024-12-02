const  jwt = require('jsonwebtoken');
const User =  require("../model/user")
 
//the job of the middleware is checking basically token exixts in my request or not
//if token is valid and user is found i will call the next handler
//validate the token
//find the user of that token if that user is exist or not
const userAuth = async (req,res,next) => {      
    try{
         //reading the cookies
            // const cookies = req.cookies;
 
            //finding token from the cookies
            // const {token} = cookies;
            const {token} = req.cookies;   //directly write
 
            if(!token){
                throw new Error("Token is not Valid");
            }
 
            //validate the token
              //validate my login
            //if my token will macth will move proceed further otherwise i will readirect on login page
            //this secret key we have define in the login route we have to pass it to the same
            //it does not gives boolean value it gives decoded values
            const decodedObj = await  jwt.verify(token ,"SajidShaikh@123");   //use .env file
 
            const {_id} = decodedObj;
           
            //find the User
            const user = await User.findById(_id);
 
            if(!user)
            {
                throw new Error("User not found");
            }
 
            //what will happen by this line whatever the user i have found on the database i have just
            //attached in to the request and called the request
            req.user =  user;
            //because this is my middlware i have to call the next function
            //next is called to move to the request handler
        next();
    } catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
   
   
}
 
 
module.exports ={
    userAuth
}