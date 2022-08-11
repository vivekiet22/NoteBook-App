
var jwt = require("jsonwebtoken");
const JWT_TOKEN = "VivekIsAGood$oy";
const fetchuser =(req,res,next)=>{

    // get the user from the jwt token and id to req oject
    const token = req.header("auth-token");
    if (!token){
        res.status(401).send({error:"Please Authenticate with valid user"})
    }
    try {
        const data = jwt.verify(token,JWT_TOKEN)
        req.user = data.user
        next()
        
    } catch (error) {
        res.status(401).send({error:"Please Authenticate with valid user"})
    }
        
    };
   


module.exports = fetchuser