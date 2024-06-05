import fs from "fs";
import winston from "winston";
const fsPromise= fs.promises;
// async function log(logData){
//     try{
//         logData= `
//          ${new Date().toString()} "Log data:" ${logData}
//         `
//        await fsPromise.appendFile("log.txt",logData)
//     }catch(err){
//         console.log(err);
//     }
// }
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'}),
    ]


})
const loggerMiddleware=async (req,res,next)=>{
    //log reqbody
    const logData=`${req.url}-${JSON.stringify(req.body.email)}`
   logger.info(logData)
    next();

}
export default loggerMiddleware;