import {
    GraphQLList,
    GraphQLString,
    GraphQLError
} from 'graphql';
import userModel from './UserSchema';
import {
    userTypes
} from './UserType';
export default {
    UserLists: {
        type: new GraphQLList(userTypes),
         resolve(root,params,context){
            console.log('context.req.cookie',context.req.cookies.token)
             if(context.req.cookies.token){
                 return userModel.getAllUser()
             }
             else { throw new GraphQLError('You are only authorized to access field "email" on your own user')}
             }
    },

    SingleUser: {
        type: userTypes,
        args: {
            email: {
                name: 'email',
                type: GraphQLString,

            }
        },
        resolve(root, params,context) {
            console.log('context.req.cookie',context.req.cookies.token)

            return userModel.findOne({
                'email': params.email
            }).exec();
        }

    }
};