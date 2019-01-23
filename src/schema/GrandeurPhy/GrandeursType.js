import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLFloat

} from 'graphql';

const grandeurTypes = new GraphQLObjectType({
    name: 'Grandeur',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        intitule: {
            type: GraphQLString
        },

        unite: {
            type: GraphQLString
        },
        resolution: {
            type: GraphQLFloat
        },
        offset: {
            type: GraphQLFloat

        },
        taille: {
            type: GraphQLFloat
        }

    }
});


const grandeurInputType = new GraphQLInputObjectType({
    name: 'GrandeurInput',
    fields: () => ({
        intitule: {
            type: GraphQLString
        },
        unite: {
            type: GraphQLString
        },
        resolution: {
            type: GraphQLFloat
        },
        offset: {
            type: GraphQLFloat

        },
        taille: {
            type: GraphQLFloat
        }

    })
})

export {grandeurTypes,grandeurInputType};