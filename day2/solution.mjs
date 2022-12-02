import { readFileSync } from 'fs'
const input = readFileSync('./input.txt', { encoding: 'utf8' })
const data = input.split('\n')

const OutcomeScore = {
  'A X': 3,
  'B Y': 3,
  'C Z': 3,
  'A Y': 6,
  'A Z': 0,
  'B X': 0,
  'B Z': 6,
  'C X': 6,
  'C Y': 0,
}

const endScore = {
  'X': 0,
  'Y': 3,
  'Z': 6
}

const opponentChoices = ['A', 'B', 'C']
const myChoices = ['X', 'Y', 'Z']

const part1 = (data) => {
  const turns = data.map(
    turn => OutcomeScore[turn] + myChoices.indexOf(turn.at(-1)) + 1
  )
  
  console.log(turns.reduce((prevSum, turnScore) => prevSum + turnScore, 0 ))
}

const part2 = (data) => {
  const turns = data.map(turn => {
    let myChoice;
    const [opponentChoice, howRoundEnds] = turn.split(' ');

    switch(howRoundEnds) {
      case 'X':
        myChoice = myChoices[opponentChoices.indexOf(opponentChoice) - 1] || myChoices[2]
        break

      case 'Y':
        myChoice = myChoices[opponentChoices.indexOf(opponentChoice)]
        break
          
      case 'Z':
        myChoice = myChoices[opponentChoices.indexOf(opponentChoice) + 1] ||  myChoices[0]
        break
    }

    return endScore[howRoundEnds] + myChoices.indexOf(myChoice) + 1
  })
  
  console.log(turns.reduce((prevSum, turnScore) => prevSum + turnScore, 0 ))
}

part1(data)
part2(data)
