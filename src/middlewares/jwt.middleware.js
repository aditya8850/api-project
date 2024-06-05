import jwt from 'jsonwebtoken'
const jwtAuth = (req, res, next) => {
    // 1.read the token
    const token = req.headers['authorization'];
    //2. if no token,return the err
    if (!token) {
        return res.status(401).send("Unauthorized")
    };
    // 3. check if token is Valid
    try {
        const payload = jwt.verify(token,"Qg7bI8SRWGSPtMfjLIplfO7KITn40Kt2");
        // console.log(payload);
        req.userId=payload.userId;
        //4.return err
    } catch (error) {
        return res.status(401).send("Unauthorized")
    }

    //5. call next()
    next();


};
export default jwtAuth;