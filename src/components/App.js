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

  handleSquareClick(index) {
    console.log('in handleSquareClick:', index);

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
        <Message />
        <Board squareVals={this.state.squareVals}
          onSquareClick={this.handleSquareClick} />
      </div>
    );
  }
}

export default App;
