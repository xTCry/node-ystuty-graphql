import { Router } from 'express';
import fetch from 'node-fetch';

const API_ADDRESS = `http://localhost:4000`;

const router = Router();

router.get('/', (req, res) => {
    res.json({ empty: 1 });
});

const graphqlFetch = (body: any = {}) =>
    fetch(`${API_ADDRESS}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    }).then((r) => r.json());

// ...
router.get('/hello', (req, res) => {
    graphqlFetch({ query: '{ hello }' }).then((data) => {
        res.json(data);
    });
});

router.get('/dice', (req, res) => {
    graphqlFetch({
        query: `query MyRollDice($dice: Int!, $sides: Int) {
              rollDice(numDice: $dice, numSides: $sides)
            }`,
        variables: { dice: 3, sides: 6 },
    }).then((data) => {
        res.json(data);
    });
});

router.get('/dice2', (req, res) => {
    graphqlFetch({
        query: `{rollDice(numDice: 5, numSides: 3)}`,
    }).then((data) => {
        res.json(data);
    });
});

export default router;
