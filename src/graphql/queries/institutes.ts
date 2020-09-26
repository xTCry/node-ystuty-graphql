import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/type';
import fetch from 'node-fetch';
import { IGroupDataType } from './groups';
import { IInstituteData } from '../../types';

/**
 * Class Institutions
 */
export default class CInstitution {
    /**
     * Возвращает массив институтов с группами
     */
    public static async all(parent: any, args: any, context: any, info: any): Promise<IInstituteData[]> {
        // context.userData.name
        return fetch('http://127.0.0.1:8087/api/v1/list/facultets')
            .then((r) => r.json())
            .then((e) => e.response)
            .then((e) => e.data);
    }
}

export const InstitutDataType = new GraphQLObjectType({
    name: 'InstitutData',
    description: 'Данные об институте',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        groups: {
            type: GraphQLList(IGroupDataType),
        },
    },
});

export const institutions = {
    type: GraphQLList(InstitutDataType),
    description: 'Список институтов',
    resolve: CInstitution.all,
    // args: {
    //     numDice: { type: GraphQLInt },
    //     numSides: { type: GraphQLInt },
    // },
};
