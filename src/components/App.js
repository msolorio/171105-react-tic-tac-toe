import React, { Component } from 'react';
import Board from './Board';
import Message from './Message';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squareVals: Array(9).fill(null),
      xIsNext: true
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  calculateWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];

    const squareVals = this.state.squareVals;

    return winningCombos.reduce((winner, combo) => {
      const [a, b, c] = combo;
      if (
        squareVals[a] !== null
        && squareVals[a] === squareVals[b]
        && squareVals[a] === squareVals[c]
      ) {
        return squareVals[a];
      }
      return winner;
    }, null);
  }

  handleSquareClick(index) {
    if (this.calculateWinner()) return;
    if (this.state.squareVals[index] !== null) return;
    const squareValsClone = this.state.squareVals.slice();
    squareValsClone[index] = this.state.xIsNext ? 'X' : 'O';

    this.setState((prevState) => ({
      squareVals: squareValsClone,
      xIsNext: !prevState.xIsNext
    }));
  }

  render() {
    return (
      <div className="App">
        <Message winner={this.calculateWinner()} xIsNext={this.state.xIsNext} />
        <Board squareVals={this.state.squareVals}
          onSquareClick={this.handleSquareClick} />
      </div>
    );
  }
}

export default App;
