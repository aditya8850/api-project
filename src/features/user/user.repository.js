import ApplicationError from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
class UserRepository {
    constructor(){
        this.collection="users"
    }
     async signUp(newUser) {
        // now in order to store the data in a db
        try {
            //1. get the database
            const db = getDB();
            //2. get the collection
            const collection = db.collection(this.collection);
            //3. insert the user into the collection
            await collection.insertOne(newUser);
            return newUser;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with db", 500)
        }

    }
    async findByEmail(email) {
        // now in order to store the data in a db
        try {
            //1. get the database
            const db = getDB();
            //2. get the collection
            const collection = db.collection('users');
            //3. find the document
            return await collection.findOne({email});
         
            
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with db", 500)
        }

    }
}
export default UserRepository;