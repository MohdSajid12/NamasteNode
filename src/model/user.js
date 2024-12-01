const mongoose = require("mongoose");

//require means this field will not insert  in the collection 
//without values in the database
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required :true,
        minLength :4,
        maxLength :100,    //if string then minLength , maxLength

    },
    lastName : {
        type : String
    },
    email :{
        type: String,
        required:true,
        lowercase : true,  //any email will store in the lower case this is best case always
        unique:true,
        trim :true,    //if any user sends his email with space we can remove it
    },                 //mongo db treats this space and withour space email id diffferent                     
    password:{
        type : String,
        required :true,
    },
    age:{
        type : Number,  //if it is number then we have to use min,max
        min :18,       //age should b minimum 18 and maximum 45
        max :45 ,
    },
    gender: {
        type : String,
        validate(value){   //this validate fun is only run when you are cretaing a new object
           if(!["male","female","others"].includes(value)){  //not work for updating
                 throw new Error("gender is not valid")
           }     //if we want to run for updating then we have to change in apis to enable
        },      //to run validator function
    },
    about:{
        type : String,
        default : "This is default user schema",  //if we will not add this value it automatically
                                                 // add
    },
    skills :{
        type : [String],   //it will allow to add array of string 
    },
} , {
    timestamps :true,   //after this createdAt , updatedAt will automstically add
})                      //buf remember this is the second argument of model
                        //always use timestamps it is good to have
const User = mongoose.model("User" , userSchema);
module.exports = User;