import React from 'react';

export default function Message(props) {

  function getMessage() {
    if (props.winner) {
      return `Winner: ${props.winner}`;
    }
    return `Player's turn: ${props.xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="Message">{getMessage()}</div>
  );
}
