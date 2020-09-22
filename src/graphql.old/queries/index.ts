import { Query as Dice } from './Dice';
import { Query as FacultetsGroups } from './FacultetsGroups';

export default {
    Query: {
        hello: () => 'Hello world!',
        ...Dice,
        ...FacultetsGroups
    },
};
