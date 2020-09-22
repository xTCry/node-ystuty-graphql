import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql/type';
import { allGroups as resolve_allGroups, all as resolve_all, GQL_IFacultyLink, GQL_ILinks2Facultets } from '../queries/FacultetsGroups';

enum EWeekParity {
    CUSTOM = 0,
    ODD = 1,
    EVEN = 2,
}

export const GQL_EWeekParity = new GraphQLEnumType({
    name: 'EWeekParity',
    values: {
        CUSTOM: {
            value: EWeekParity.CUSTOM,
            description: 'День недели может быть любым',
        },
        ODD: {
            value: EWeekParity.ODD,
            description: 'День недели должен быть нечетный',
        },
        EVEN: {
            value: EWeekParity.EVEN,
            description: 'День недели должен быть четный',
        },
    },
});


/* type Query {
    ? hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
    getDie(numSides: Int): RandomDie
    ? all: [ILinks2Facultets]
    ? allGroups: [IFacultyLink]
} */
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            deprecationReason: 'For test',
            resolve() {
                return 'HelloW!';
            },
        },
        all: {
            type: GraphQLList(GQL_ILinks2Facultets),
            description: 'Список факультетов (институтов) с группами',
            resolve: resolve_all,
        },
        allGroups: {
            type: GraphQLList(GQL_IFacultyLink),
            description: 'Список всех групп',
            resolve: resolve_allGroups,
        },
    },
});

export default queryType;
