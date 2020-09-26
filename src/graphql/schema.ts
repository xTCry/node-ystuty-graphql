import { GraphQLSchema } from 'graphql';
import types from './types';

// import mutationType from './mutations';
// import subscriptionType from './subscriptions';
import queryType from './queries';

const schema = new GraphQLSchema({
    query: queryType,
    // mutation: mutationType,
    // subscription: subscriptionType,
    types,
});

export default schema;
