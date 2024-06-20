
import dotenv from "dotenv";
dotenv.config();//this is going to load all the env variables in our application


//to create a new replication mongo server:
//open up a terminal 
// mongod —replSet rs0 –dbpath “C:\Program Files\MongoDB\Server\7.0\data”
//let it run and open another terminal:
//-- mongosh
//- rs.initiate() 