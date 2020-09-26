import { GraphQLEnumType } from 'graphql';

/**
 * Четность недели
 */
export enum EWeekParity {
    /**
     * День недели может быть любым
     */
    CUSTOM = 0,
    /**
     * День недели должен быть нечетный
     */
    ODD = 1,
    /**
     * День недели должен быть четный
     */
    EVEN = 2,
}

export enum EWeekNumber {
    Monday = 0,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday = 6,
}

export enum ELessonFlags {
    None = 0,
    Lecture = 1 << 1,
    Practical = 1 << 2,
    Labaratory = 1 << 3,
    CourseProject = 1 << 4,
}

export const LessonFlagsType = new GraphQLEnumType({
    name: 'LessonFlags',
    description: 'Тип пары',
    values: {
        None: {
            value: ELessonFlags.None,
            description: 'Нету',
        },
        Lecture: {
            value: ELessonFlags.Lecture,
            description: 'Лекция',
        },
        Practical: {
            value: ELessonFlags.Practical,
            description: 'Практика',
        },
        Labaratory: {
            value: ELessonFlags.Labaratory,
            description: 'Лабораторная',
        },
        CourseProject: {
            value: ELessonFlags.CourseProject,
            description: 'Курсовая',
        },
    },
});

export const WeekParityType = new GraphQLEnumType({
    name: 'WeekParity',
    description: 'Четность недели',
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

export const WeekNumberType = new GraphQLEnumType({
    name: 'WeekNumber',
    description: 'День недели',
    values: {
        Monday: {
            value: EWeekNumber.Monday,
            description: 'Пн',
        },
        Tuesday: {
            value: EWeekNumber.Tuesday,
            description: 'Вт',
        },
        Wednesday: {
            value: EWeekNumber.Wednesday,
            description: 'Ср',
        },
        Thursday: {
            value: EWeekNumber.Thursday,
            description: 'Чт',
        },
        Friday: {
            value: EWeekNumber.Friday,
            description: 'Пт',
        },
        Saturday: {
            value: EWeekNumber.Saturday,
            description: 'Сб',
        },
        Sunday: {
            value: EWeekNumber.Sunday,
            description: 'Вс',
        },
    },
});
