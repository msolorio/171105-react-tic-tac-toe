import React, { Component } from 'react';
import Board from './Board';

// TODO: app will hold the application state
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squareVals: Array(9).fill(null)
    };
  }

  render() {
    return (
      <div className="App">
        from app component
        <Board squareVals={this.state.squareVals} />
      </div>
    );
  }
}

export default App;
