import { readFileSync } from 'fs'
const input = readFileSync('./input.txt', { encoding: 'utf8' })
const data = input.split('\n')

const opponentChoices = ['A', 'B', 'C']
const ourChoices = ['X', 'Y', 'Z']

const part1 = (data) => {
  const turns = data.map(
    turn => {
      const [opponentChoice, ourChoice] = turn.split(' ')
      const opponentMove = opponentChoices.indexOf(opponentChoice) + 1
      const ourMove = ourChoices.indexOf(ourChoice) + 1
      
      if (opponentMove === ourMove) { // draw
        return 3 + ourMove
      }

      if (ourMove - opponentMove === 1 || ourMove - opponentMove === -2) { // won
        return 6 + ourMove
      }

      return ourMove // lost
    }
  )

  console.log(turns.reduce((prevSum, turnScore) => prevSum + turnScore, 0 ))
}

const part2 = (data) => {
  const turns = data.map(
    turn => {
      const [opponentChoice, outcome] = turn.split(' ')
      const opponentMove = opponentChoices.indexOf(opponentChoice) + 1
      
      if (outcome === 'X') { // need to loose
        return opponentMove - 1 || 3
      }

      if (outcome === 'Y') { // need to loose
        return 3 + opponentMove
      }

      return ((opponentMove + 1) > 3 ? 1 : (opponentMove + 1)) + 6 // need to win
    }
  )

  console.log(turns.reduce((prevSum, turnScore) => prevSum + turnScore, 0 ))
}

part1(data)
part2(data)