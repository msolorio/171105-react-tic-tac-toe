import React, { Component } from 'react';
import Board from './Board';
import Message from './Message';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squareVals: Array(9).fill(''),
      xIsNext: true
    };

    this.winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];

    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  calculateWinner() {
    const squareVals = this.state.squareVals;

    return this.winningCombos.reduce((winner, combo) => {
      const [a, b, c] = combo;

      if (
        squareVals[a] !== ''
        && squareVals[a] === squareVals[b]
        && squareVals[a] === squareVals[c]
      ) {
        return squareVals[a];
      }
      return winner;
    }, '');
  }

  // returns boolean value signifying if there are available squares left
  squaresAvailable() {
    return this.state.squareVals.reduce((squaresLeft, square) => {
      if (square === '') return true;
      return squaresLeft;
    }, false);
  }

  handleSquareClick(index) {
    if (this.calculateWinner()) return;
    if (this.state.squareVals[index] !== '') return;
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
        <Message winner={this.calculateWinner()}
          squaresAvailable={this.squaresAvailable()}
          xIsNext={this.state.xIsNext} />
        <Board squareVals={this.state.squareVals}
          onSquareClick={this.handleSquareClick} />
      </div>
    );
  }
}

export default App;
