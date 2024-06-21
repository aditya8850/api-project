import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        try {
            const { name, email, password, type } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new UserModel(name, email, hashedPassword, type);
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        }catch(error){
            next(error)
        }
    }

    async signIn(req, res, next) {
        try {
            //finding user by email
            const user = await this.userRepository.findByEmail(req.body.email);
            if (!user) {
                return res.status(400).send('incorrect credentials');
            } else {
                // Compare password with hashed password
                const result = await bcrypt.compare(req.body.password, user.password);
                //if the comparison is true , we create a jwt authentication token
                if (result) {
                    const token = jwt.sign(
                        { userId: user._id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '100h' }
                    );
                    //sending the token
                    return res.status(200).send(token);
                    //if comparison is not succesfull
                } else {
                    return res.status(400).send('incorrect credentials');
                }
            }
        } catch (err) {
            next(err)
            console.log(err);
            return res.status(400).send("something went wrong");
        }
    }
    async resetPassword(req, res, next) {
        const { newPassword } = req.body
        const userId = req.userId
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        try {
            await this.userRepository.resetPassword(userId, hashedPassword);
            res.status(200).send('password reset successfully')
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Couldn't update password", 404)
        }

    }
}
