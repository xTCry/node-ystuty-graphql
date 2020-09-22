import { merge } from 'lodash';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';

/** Queries */
import queries from './queries';

/** Mutations */
import mutations from './mutations';

/** Customs */
import customs from './customs';

/** Types */
import types from './types';

const resolvers: IResolvers = merge(
    queries,
    mutations,
    customs
);

const typeDefs = [types];

const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});

export default schema;
