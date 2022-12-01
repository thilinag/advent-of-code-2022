import { readFileSync } from 'fs'
const input = readFileSync('./input.txt', { encoding: 'utf8' })

const data = input.split('\n\n')

console.log(
  data
    .map(
      elf => 
        elf.split('\n') // get each elf's calorie total as an array
          .reduce((prevSum, calories) => prevSum + Number(calories), 0)
    ) 
    .sort((a, b) => b - a) // sort it DESC
    .at(0) // Sum of calories of the elf carrying the most calories
)