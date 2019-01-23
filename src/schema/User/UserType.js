import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLInt

} from 'graphql';

const userTypes = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },

        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString

        },
        role: {
            type: GraphQLInt

        }
    }
});




const userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        name: {
            type: GraphQLString
        },

        email: {
            type: GraphQLString
        },

        password: {
            type: GraphQLString
        }
    })
})


const loginInputType = new GraphQLInputObjectType({
    name: 'loginInput',
    fields: () => ({

        email: {
            type: GraphQLString

        },
        password: {
            type: GraphQLString
        },


    })
})

export {
    userTypes,
    userInputType,
    loginInputType
};