import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql/type';
import { institutions } from './institutes';
import { groups } from './groups';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'Ping-pong',
            resolve() {
                return `HelloW, Z${Math.random().toString(36).substring(2, 4)}!`;
            },
        },
        institutions,
        groups,
        rollDice: {
            type: new GraphQLList(GraphQLInt),
            args: {
                numDice: { type: GraphQLInt },
                numSides: { type: GraphQLInt },
            },
            resolve: (parent: any, args: any, context: any, info: any) => {
                let { numDice = 0, numSides = 0 }: { numDice?: number; numSides?: number } = args;
                let output = [];
                for (let i = 0; i < numDice; i++) {
                    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
                }
                return output;
            },
        },
    },
});

export default queryType;
