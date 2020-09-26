import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import fetch from 'node-fetch';
import { IGroupData, ItResponse, IWeek } from '../../types';
import { DateType } from '../types/dateType';
import { LessonFlagsType, WeekNumberType, WeekParityType } from './WeekTypes';

/**
 * Class Groups
 */
export default class CGroup {
    /**
     * Возвращает массив групп из всех институтов
     */
    public async all(): Promise<IGroupData[]> {
        return fetch('http://127.0.0.1:8087/api/v1/list/groups')
            .then((r) => r.json())
            .then((e) => e.response)
            .then((e) => e.data);
    }

    /**
     * ...
     */
    public async get(args: any): Promise<IWeek[]> {
        let { name, weekNumber }: { name: string, weekNumber?: number } = args;
        return fetch(`http://127.0.0.1:8087/api/v1/get/${encodeURI(name)}`)
            .then((r) => r.json())
            .then((e: ItResponse<IWeek[]>) => e.response)
            .then((e) => e.data)
            .then((e) => (weekNumber ? e.filter((w) => w.number === weekNumber) : e));
    }
}

// ***
export const ILessonType = new GraphQLObjectType({
    name: 'ILesson',
    description: 'Предмет',
    fields: {
        number: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Порядковый номер пары на дню',
        },
        time: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Временной интервал пары',
        },
        originalTimeTitle: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Оригинальная строка с порядковым номером пары на дню со интервалом времени',
        },
        lessonName: {
            type: GraphQLString,
            description: 'Название предмета пары',
        },
        parity: {
            type: GraphQLNonNull(WeekParityType),
        },
        range: {
            type: GraphQLList(GraphQLInt),
            description: 'Дата',
        },
        type: {
            type: GraphQLNonNull(LessonFlagsType),
        },
        isStar: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Со звездой',
        },
        duration: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Длительность пары',
        },
        isDivision: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Есть ли разделение по подгруппам',
        },
        auditoryName: {
            type: GraphQLString,
            description: 'Буква корпуса, номер аудитори',
        },
        teacherName: {
            type: GraphQLString,
            description: 'ФИО преподователя',
        },
        subInfo: {
            type: new GraphQLObjectType({
                name: 'subInfo',
                fields: {
                    range: {
                        type: GraphQLList(GraphQLInt),
                        description: 'Дата',
                    },
                    auditoryName: {
                        type: GraphQLString,
                        description: 'Буква корпуса, номер аудитори',
                    },
                },
            }),
            description: 'Дополнительная инфа',
        },
        original: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Оригинальная строка из расписания',
        },
    },
});

export const IWeekDayType = new GraphQLObjectType({
    name: 'IWeekDay',
    description: 'Информация',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Название?..',
        },
        type: {
            type: WeekNumberType,
        },
        date: {
            type: DateType,
        },
        dateStr: {
            type: GraphQLString,
            description: 'Дата',
        },
        weekNumber: {
            type: GraphQLInt,
            description: 'Номер недели',
        },
        parity: {
            type: WeekParityType,
        },
    },
});

export const IDayType = new GraphQLObjectType({
    name: 'IDay',
    description: 'Расписание на день',
    fields: {
        info: {
            type: GraphQLNonNull(IWeekDayType),
        },
        lessons: {
            type: GraphQLNonNull(GraphQLList(ILessonType)),
            description: 'Предметы',
        },
    },
});

export const IWeekType = new GraphQLObjectType({
    name: 'IWeek',
    description: 'Расписание на неделю',
    fields: {
        number: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Номер недели',
        },
        days: {
            type: GraphQLNonNull(GraphQLList(IDayType)),
            description: 'Расписание по дням',
        },
    },
});
// ***

export const IGroupDataType = new GraphQLObjectType({
    name: 'GroupData',
    description: 'Данные о группе',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Название группы',
        },
        link: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Ссылка на расписание группы',
        },
        linkLecture: {
            type: GraphQLString,
            description: 'Ссылка на расписание лекционной недели группы',
        },
    },
});

export const ICGroupType = new GraphQLObjectType({
    name: 'CGroup',
    description: 'Класс групп',
    fields: {
        all: {
            description: 'Список групп из всех институтов',
            type: GraphQLList(IGroupDataType),
        },
        get: {
            description: 'Получить расписание по названию группы',
            type: GraphQLList(IWeekType),
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                weekNumber: { type: GraphQLInt },
            },
        },
    },
});

export const groups = {
    // name: 'CGroup',
    // description: 'Класс групп',
    type: ICGroupType,
    resolve: (parent: any, args: any, context: any, info: any) => new CGroup(),
};
