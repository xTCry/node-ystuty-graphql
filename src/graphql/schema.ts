import { GraphQLSchema } from 'graphql';

import mutationType from './mutations';
import subscriptionType from './subscriptions';
import queryType from './types';

const schema = new GraphQLSchema({
    query: queryType,
    // mutation: mutationType,
    // subscription: subscriptionType,
});

export default schema;