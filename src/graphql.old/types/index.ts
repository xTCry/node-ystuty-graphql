import { gql } from 'apollo-server-core';

const Types = gql`
    scalar Date

    type IFacultyLink {
        title: String!
        link: String!
        linkLecture: String
    }

    type ILinks2Facultets {
        title: String!
        links: [IFacultyLink!]!
    }

    enum EWeekParity {
        CUSTOM
        ODD
        EVEN
    }

    enum ELessonFlags {
        None
        Lecture
        Practical
        Labaratory
        CourseProject
    }

    enum EWeekNumber {
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
    }

    type IMDay {
        info: IWeekDay!
        lessons: [ILesson!]!
    }

    type IDay {
        info: IWeekDay!
        lessons: [ILesson!]!
    }

    type IWeek {
        number: Int!
        days: [IDay!]!
    }

    type IWeekDay {
        name: String!
        type: EWeekNumber
        date: Date
        dateStr: String
        weekNumber: Int
        parity: EWeekParity
    }

    type ILesson {
        number: Int!
        time: String!
        originalTimeTitle: String!
        parity: EWeekParity!
        range: [Int!]!
        lessonName: String
        type: ELessonFlags!
        isStar: Boolean!
        duration: Int!
        isDivision: Boolean!
        auditoryName: String
        teacherName: String
        subInfo: SubInfo
        original: String!
    }

    type SubInfo {
        range: [Int!]!
        auditoryName: String
    }

    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }

    type Query {
        hello: String
        rollDice(numDice: Int!, numSides: Int): [Int]
        getDie(numSides: Int): RandomDie
        all: [ILinks2Facultets]
        allGroups: [IFacultyLink]
    }

    #type Mutation { }
`;

export default Types;
