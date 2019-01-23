import {  grandeurTypes ,grandeurInputType} from './GrandeursType';
import grandeurModel from './GrandeursSchema';
import {
    GraphQLID,
    GraphQLString,
    GraphQLFloat ,
    GraphQLNonNull,
    GraphQLError
  } from 'graphql';
  import checkAuth from '../midlware'


    export default {
        GrandeurAdd:{
            type : grandeurTypes,
            args:{
                intitule : {
                    name : "intitule",
                    type:GraphQLString
                },
                unite : {
                    name : "unite",
                    type:GraphQLString
                },
                resolution : {
                    name : "resolution",
                    type:GraphQLFloat 
                },
                offset : {
                    name : "offset",
                    type:GraphQLFloat 
                },
                taille : {
                    name : "taille",
                    type:GraphQLFloat 
                }
                
            },
            resolve:(root,args,context)=> { 
                if(checkAuth(root,args,context)===true){
                    return  grandeurModel.addgrandeur(root,args)
                    }
                    else { throw new GraphQLError('You are only authorized to access field "email" on your own user')} }
        },

        GrandeurUpdate: {
            type: grandeurTypes,
            args: {
                id: {
                    name: 'ID',
                    type: new GraphQLNonNull(GraphQLID)
                },
                data: {
                    name: 'data',
                    type: new GraphQLNonNull(grandeurInputType)
                }
            },
            resolve:(root,args,context)=>{ 
                
            
                if(checkAuth(root,args,context)===true){
                    return grandeurModel.updategrandeur(root,args)
                    }
                    else { throw new GraphQLError('You are only authorized to access field "email" on your own user')} }
        },
        GrandeurRemove: {

            type: grandeurTypes,
            args: {
                id: {
                    name: 'id',
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve:(root,args,context)=>{ 
                if(checkAuth(root,args,context)===true){
                    return  grandeurModel.removegrandeur(root,args)
                    }
                    else { throw new GraphQLError('You are only authorized to access field "email" on your own user')} }
        },
    
    
    }