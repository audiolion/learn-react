// Tic Tac Toe: useReducer
import React from 'react'

// Here's the game that supports history. We've moved the <Board /> to a simple
// UI-only component (sometimes referred to as a "presentational component").
// The <Game /> component holds all the logic for our app. We're using two
// useState hooks for managing our state. Most of the logic for updating our
// state lives in the `selectSquare` function. Let's extract that logic into
// a pure function and use React's useReducer function.
// Here's an example of how you might use the useReducer hook for our old
// counter example component:
//
// function counterReducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT': {
//       return {count: state.count + 1}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }
// function Counter() {
//   const [state, dispatch] = React.useReducer(counterReducer, {count: 0})
//   const {count} = state
//   const increment = () => dispatch({type: 'INCREMENT'})
//   return <button onClick={increment}>{count}</button>
// }
//
// 🦉 our counterReducer _could_ be inlined as a function within the Counter
//    component itself and there's nothing wrong with this. It could be
//    useful if you wanted to make the reducer take props into account for
//    example. But I personally prefer to extract it. There's not really a
//    significant benefit either way...
//
// 🦉 our counterReducer is using a switch statement and this is pretty
//    typical of reducers, but it does not have to use a switch statement.
//    You can do whatever you like to there. What matters is that it gets
//    passed the state and an argument passed by dispatch. We're calling that
//    argument "action" but you could call it whatever you want and it
//    doesn't even have to have a "type" property if you don't want.
//    All that said, this is a pretty typical example of a reducer.
//
// 🦉 The idea behind the reducer is that it handles most of the logic for your
//    component and your component simply invokes dispatch with all the data
//    that the reducer needs to do it's job.
//
// With that example, I'd like you to take all the state in Game and put it into
// a single React.useReduce(reducer, initialState) hook.

function Board({squares, onClick}) {
  const renderSquare = i => (
    <button className="square" onClick={() => onClick(i)}>
      {squares[i]}
    </button>
  )

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function boardReducer(state, action) {
  const xIsNext = state.stepNumber % 2 === 0
  switch (action.type) {
    case 'SET_STEPNUMBER': {
      return {
        ...state,
        stepNumber: action.stepNumber,
      }
    }
    case 'SELECT_SQUARE': {
      const newHistory = state.history.slice(0, state.stepNumber + 1)
      const current = newHistory[newHistory.length - 1]
      const squares = [...current.squares]

      if (calculateWinner(squares) || squares[action.square]) {
        return
      }

      squares[action.square] = xIsNext ? 'X' : 'O'
      const history = [...newHistory, {squares}]
      return {
        ...state,
        history,
        stepNumber: state.stepNumber + 1,
      }
    }
    default:
      throw new Error(`Unexpection action: ${action.type}`)
  }
}

function Game() {
  // 🐨 Take the next two lines and replace them with a single React.useReducer call
  const [state, dispatch] = React.useReducer(boardReducer, {
    history: [{squares: Array(9).fill(null)}],
    stepNumber: 0,
  })

  const {history, stepNumber} = state

  const xIsNext = stepNumber % 2 === 0

  function selectSquare(square) {
    dispatch({type: 'SELECT_SQUARE', square})
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (current.squares.every(Boolean)) {
    status = `Scratch: Cat's game`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  const moves = history.map((_, stepNumber) => {
    const desc = stepNumber ? `Go to move #${stepNumber}` : 'Go to game start'
    return (
      <li key={stepNumber}>
        <button onClick={() => dispatch({type: 'SET_STEPNUMBER', stepNumber})}>
          {desc}
        </button>
      </li>
    )
  })

  // If you've made it this far and the tests are still passing and the app
  // still works then you're done! 🎉 Don't forget the 💯 below!

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={current.squares} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// 💯 That history functionality is pretty cool! Why don't you try to make a
//    reusable version of that hook? You could call it `useHistory` or something
//    and it could expose the following data/functions: history, entryNumber,
//    current, goToEntry, and addEntry. Then you can use that instead. You'll
//    need to move some of the logic around to make it generic enough to be
//    useful, but it's pretty neat.
// 💯 Once you've got `useHistory`, you might consider making a `useGame` custom
//    hook that handles all the logic for our component. Just for fun. It would
//    use the `useHistory` hook and it could expose the following
//    data/functions: history, squares, selectSquare, goToStep, status
//    When you're done, your component will simply use `useGame` and return some
//    JSX elements. Cool right!?

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Usage() {
  return <Game />
}
Usage.title = 'Tic Tac Toe: useReducer'

export default Usage
