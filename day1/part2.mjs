import { getInput } from './../getInput.mjs';

const input = await getInput('./input.txt');
const data = input.split('\n\n')

console.log(
    data
        .map(elf => elf.split('\n')
        .reduce((p, c) => p + Number(c), 0))
        .sort((a, b) => a - b)
        .slice(-3)
        .reduce((p, c) => p + c, 0)
)