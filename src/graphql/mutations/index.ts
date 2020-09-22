import { GraphQLObjectType } from 'graphql/type';

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({}),
});

export default mutationType;
