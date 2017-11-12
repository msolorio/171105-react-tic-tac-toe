import React from 'react';

export default function Square(props) {

  function handleSquareClick() {
    props.onSquareClick(props.index);
  }

  return (
    <div className={`Square Square-${props.index}`}
      onClick={handleSquareClick}>
      {props.squareVal}
    </div>
  );
}
