import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import mongoose from 'mongoose';
import schema from './schema';
import dotenv from "dotenv";
import path from "path"
import logger from "morgan";

const server = express();
const myGraphQLSchema = schema;

// Load settings
let APP_ENV = process.env.NODE_ENV || "DEV";
const conffile = path.join(__dirname, `/../config/${APP_ENV}.env`);
dotenv.config({
  path: conffile
});

let secret=process.env.SECRET
let secret_2=process.env.SECRET_2


//  mongoose.connect("mongodb://" + process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.HOST + ":" + process.env.PORT + "/" + process.env.DATABASE);

mongoose.connect("mongodb://" + process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.HOST + ":" + process.env.PORT + "/" + process.env.DATABASE,{
    useCreateIndex: true,
    useNewUrlParser: true,
    autoIndex: false })
mongoose.set('useCreateIndex', true);


server.use('*', cors({credentials: true, origin: true}) );
server.use(cookieParser());

server.use(logger('combined'));
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use('/graphql', bodyParser.json(), graphqlExpress((req,res)=>({
  schema: myGraphQLSchema ,
   context: {req,res,secret,secret_2} 
})));
server.use('/graphiql', bodyParser.json(), graphiqlExpress({
  endpointURL: '/graphql'
}));





server.listen(process.env.PORT_LISTEN, function () {
  console.log(' app listening on port ' + process.env.PORT_LISTEN)
})