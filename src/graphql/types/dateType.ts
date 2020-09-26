import { GraphQLScalarType, Kind } from 'graphql';

export const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        console.log('parseValue', value);
        return new Date(value);
    },
    serialize(value: Date) {
        // console.log('serialize', value);
        
        return new Date(value).getTime();
    },
    parseLiteral(ast) {
        console.log('parseLiteral', ast);
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    },
});