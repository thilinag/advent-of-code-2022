import { getInput } from './../getInput.mjs';

const input = await getInput('./input.txt');
const data = input.split('\n\n')

console.log(
    data
        .map(elf => elf.split('\n') // get each elf's calorie total as an array
            .reduce((p, c) => p + Number(c), 0)
        ) 
        .sort((a, b) => b - a) // sort it DESC
        .slice(0, 3) // get top 3 highest calorie elves
        .reduce((p, c) => p + c, 0) // get calorie total of top 3 highest calorie elves
)