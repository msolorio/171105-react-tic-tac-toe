import React from 'react';
import PropTypes from 'prop-types';

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

Square.propTypes = {
  index: PropTypes.number.isRequired,
  squareVal: PropTypes.string.isRequired,
  onSquareClick: PropTypes.func.isRequired
};
