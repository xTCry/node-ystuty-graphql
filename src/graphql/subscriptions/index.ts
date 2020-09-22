import { GraphQLObjectType } from 'graphql/type';
import { PubSub } from 'apollo-server-express';

export let pubsub = new PubSub();

const subscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: () => ({}),
});

export default subscriptionType;
