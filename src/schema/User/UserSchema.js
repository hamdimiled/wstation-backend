import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import {
  GraphQLError
} from 'graphql';


const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0
  },
});



//create the model
const UserModel = mongoose.model('user', UserSchema);


//export the model
module.exports = UserModel;
module.exports.getAllUser = () => {

  return UserModel.find().exec()
}





//add user  
module.exports.adduser = async (root, args, context) => {
  const user = await UserModel.find({
    email: args.email
  })
  if (user.length >= 1) {
    new Error('Mail Exist');
  } else {
    const hash  = await bcrypt.hash(args.password, 10)
    const uModel = await new UserModel({
      name: args.name,
      email: args.email,
      password: hash,
      role: args.role
    });
    const newUser = await uModel.save();
    return newUser
  }
}


//add user
// module.exports.adduser = (root, args, context) => {
//   UserModel.find({
//     email: args.email
//   }).then((usr, err) => {
//     if (usr.length >= 1) throw new Error('Invalid login');
//     else {
//       bcrypt.hash(args.password, 10, (err, hash) => {
//         if (err)
//           return err
//         else {
//           console.log('hash', hash)
//           const uModel = new UserModel({
//             name: args.name,
//             email: args.email,
//             password: hash,
//             role: args.role
//           });
//           const newUser = uModel.save();
//           return newUser
//         }
//       })
//     }
//   })

// }