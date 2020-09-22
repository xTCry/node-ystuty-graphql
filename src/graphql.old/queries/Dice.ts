export class RandomDie {
    numSides: number;
    constructor(numSides: number) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }: any) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

export const rollDice = (parent: any, args: any, context: any, info: any) => {
    let { numDice = 0, numSides = 0 }: { numDice?: number; numSides?: number } = args;
    let output = [];
    for (let i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
};

export const getDie = (parent: any, args: any, context: any, info: any) => {
    let { numSides = 0 }: { numSides?: number } = args;
    return new RandomDie(numSides || 6);
};

export const Query = {
    rollDice,
    getDie,
};
