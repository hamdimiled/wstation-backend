
import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import GrandeurQuerie from './GrandeurPhy/GrandeursQueries';
import GrandeurMutation from './GrandeurPhy/GrandeursMutations';
import UserQueries from "./User/UserQueries"
import UserMutation from './User/UserMutations';



export default new GraphQLSchema({

    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({ ...GrandeurQuerie, ...UserQueries})
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({ ...GrandeurMutation, ...UserMutation})
    })
})