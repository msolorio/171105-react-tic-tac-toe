import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {

  function getMessage() {
    switch(true) {
      // converts to a boolean value
      case !!props.winner:
        return `Winner: ${props.winner}`;
      case !props.squaresAvailable:
        return `Game over. There are no available squares.`;
      default:
        return `Player's turn: ${props.xIsNext ? 'X' : 'O'}`;
    }
  }

  return (
    <div className="Message">{getMessage()}</div>
  );
}

Message.propTypes = {
  winner: PropTypes.string.isRequired,
  squaresAvailable: PropTypes.bool.isRequired,
  xIsNext: PropTypes.bool.isRequired
};
