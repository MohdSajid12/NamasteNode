const express = require("express");
const  app = express();
const connectDb = require("./config/database");
const User =  require("./model/user")

app.use(express.json());

app.post("/signup" ,async (req,res,next)=>{
     const user = new User(req.body);   
     try{
        await user.save();
        res.send("user created successfully");
     } catch(err){
        res.status(400).send("something went wrong" + err.message);
     }
})

//will get All the data from the database first of know which model you have to use
//if you want to get user data you have to use in user data means user model
//model means user table

//find by email
app.get("/user" ,async(req,res)=>{
      const userEmail =  req.body.email;     
      try{
        const users = await  User.find({email :userEmail});
        
        if(users.length == 0)
        {
            res.status(404).send("user not found");
        } else
        {
            res.send(users);
        }
      }catch(err){
        res.status(404).send("user not find");
      }
})

//GET all the users
app.get("/getalluser" , async (req,res)=>{    
      try
      {
        const users = await User.find({});
        res.send(users);
      } catch(err){
        res.status(400).send("something went wrong");
      }

})

//if we have same email ,name user this will return only one oldest one
//if same docuemnt(data) it will return always one
app.get("/getOneUserData",async (req,res)=>{  
    const email = req.body.email
    try
    {
        const users= await User.findOne({email:email});
        if(!users)
        {
            res.status(404).send("user not found");
        } else
        {
            res.send(users);
        }
    } catch(err){
        res.status(404).status("users not found")
    }
})


app.get("/findbyId" ,async(req,res)=>{
    const id = req.body.userId;
    try
    {
        const users = await User.findById(id);
        if(!users)
        {
            res.status(404).send("user not found");
        } else
        {
            res.send(users);
        }
    } catch(err){
        res.send(400).send("something went wrong");
    }
})


app.delete("/findbyIdAndDelete",async(req,res)=>{
    const userId = req.body.id;
    try
    {
        // both will work
        const user = await User.findByIdAndDelete(userId);
        // await User.findByIdAndDelete({_id : userId});
        res.send("deleted successfully");
    } catch(err){
        res.send("something went wrong");
    }
})

//Update-Api - update the data of the user
//in the update  api if you are passing some extra innfromation or some extra line
//which is not present in the document like skills cloumn not present in your database
//and you are passing if not present in the  schema it will not not in the docuemnt
//it will ignore it

app.patch("/findAndUpdate" ,async (req,res)=>{
    const id = req.body.id;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id:id},data);
        res.send("User updated successfully");
    } catch(err){
       res.status(400).send("Something went wrong");
    }

    //{returnDocument:"before"} is option parameter ka mtlb h ki update krne se phle
    //jo old data h use retrun krta h agr isme after lga denge to update ke bad ka data
    //return krega
    // try{
    //     const user =await User.findByIdAndUpdate({_id:id},data ,{returnDocument:"before"});
    //     console.log(user);
    //     res.send("User updated successfully");
    // } catch(err){
    //    res.status(400).send("Something went wrong");
    // }
})


app.post("/" ,(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("Something went wrong");
    }
})


connectDb().then(()=>{
    console.log("database is connected successfully");

    app.listen(7777,()=>{
         console.log(`server is listening at the port ${7777}`);
    })
}).catch(err=>{
    console.log("Something went wrong"+err.message);
})

