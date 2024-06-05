import UserModel from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
    //check if authorization header is empty.
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send("Unauthorized");
    }
    console.log("authHeader:        "+authHeader);
    //extract the credentials.
    const base64Credentials = authHeader.replace('Basic ','');
    //decode the credentials.
    console.log("base64:             "+base64Credentials);
    const decodedCreds= Buffer.from(base64Credentials,'base64').toString('utf-8');
    console.log("decodedCreds:     "+decodedCreds);
    const creds= decodedCreds.split(':');
    console.log("creds:          "+creds);
    const user=  UserModel.getAll().find(u=>u.email==creds[0]&&u.password==creds[1]);
    if(user){
        next();
    }
    else{
        return res.status(401).send("Incorrect credentials.")
    }
}
export default basicAuthorizer;