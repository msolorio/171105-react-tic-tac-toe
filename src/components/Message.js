import React from 'react';

export default function Message(props) {

  console.log('props.winner:', props.winner);

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
