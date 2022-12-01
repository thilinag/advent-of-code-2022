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
    .slice(0, 3) // get top 3 Elves carrying the most calories
    .reduce((p, c) => p + c, 0) // Calories sum of top 3 Elves carrying the most calories
)