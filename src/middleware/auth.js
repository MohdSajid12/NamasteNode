const adminAuth = (req,res,next) =>{
    console.log("admin path is getting checked");
    const token  = "XYZ";
    const idAdminChecked = token === 'XYZ';
   
    if(!idAdminChecked)
    {
        res.status(401).send("Unauthoririez access");
    } else
    {
        next();
    }
}
 
const userAuth = (req,res,next) =>{
    console.log("user path is getting checked");
    const token  = "XYZ";
    const idAdminChecked = token === "XYZ";
   
    if(!idAdminChecked)
    {
        res.status(401).send("Unauthoririez access");
    } else
    {
        next();
    }
}
 
 
module.exports ={
    adminAuth,
    userAuth
}