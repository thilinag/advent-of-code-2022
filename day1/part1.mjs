import { getInput } from './../getInput.mjs';

const input = await getInput('./input.txt');
const data = input.split('\n\n')

console.log(
  data
    .map(elf => elf.split('\n') // get each elf's calorie total as an array
      .reduce((p, c) => p + Number(c), 0)
    ) 
    .sort((a, b) => b - a) // sort it DESC
    .at(0) // highest calorie elf
)