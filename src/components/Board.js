import React from 'react';
import Square from './Square';

export default function Board(props) {

  function renderSquares() {
    return props.squareVals.map((squareVal, index) => {
      return <Square index={index} />;
    });
  }

  return (
    <div className="Board">
      {renderSquares()}
    </div>
  );
}
