import {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLError
} from 'graphql';
import grandeurModel from './GrandeursSchema';
import {
    grandeurTypes
} from './GrandeursType';
import checkAuth from '../midlware'


export default {

    GrandeursLists: {
        type: new GraphQLList(grandeurTypes),
        resolve:(root,args,context) => {
            if(checkAuth(root,args,context)===true){
            return grandeurModel.getAllGrandeurs(root,args,context)
            }
            else { throw new GraphQLError('You are only authorized to access field "email" on your own user')} 
        }
    },

    Grandeur: {
        type: grandeurTypes,
        args: {
            id: {
                name: 'ID',
                type: new GraphQLNonNull(GraphQLID)
            }
        },

        resolve:(root,args,context)=>{ 
            if(checkAuth(root,args,context)===true){
                return grandeurModel.getGrandeur(root,args)
                }
                else { throw new GraphQLError('You are only authorized to access field "email" on your own user')} 
            
        }
    }
}