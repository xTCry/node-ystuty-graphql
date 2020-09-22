export interface IFacultyLink {
    title: string;
    link: string;
    linkLecture?: string;
}

export interface ILinks2Facultets {
    title: string;
    links: IFacultyLink[];
}

const FSLinks: ILinks2Facultets[] = [
    {
        title: 'F 1',
        links: [
            {
                title: 'MyName 1',
                link: '#',
            },
            {
                title: 'MyName 2',
                link: '#',
                linkLecture: '#0',
            },
        ],
    },
    {
        title: 'F 2',
        links: [
            {
                title: 'MyName 3',
                link: '#',
                linkLecture: '#0',
            },
            {
                title: 'MyName 4',
                link: '#',
            },
        ],
    },
];

export const all = (parent: any, args: any, context: any, info: any): ILinks2Facultets[] => {
    return FSLinks || [];
};

export const allGroups = (parent: any, args: any, context: any, info: any): IFacultyLink[] => {
    if (!FSLinks) {
        return [];
    }

    return FSLinks.reduce((a: IFacultyLink[], f) => [...a, ...f.links], []);
};

export const Query = {
    all,
    allGroups,
};
