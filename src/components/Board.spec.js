import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import App from './App';
import Board from './Board';
import Square from './Square';

const boardProps = {
  squareVals: Array(9).fill(''),
  onSquareClick: jest.fn()
};

describe('Board', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(
      <Board {...boardProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should pass onSquareClick as a prop to Square', () => {
    const firstSquare = mount(<Board {...boardProps} />).find(Square).first();

    expect(firstSquare.prop('onSquareClick')).toBe(boardProps.onSquareClick);
  });

  it('should pass the correct values to each square based on squareVals prop passed in', () => {
    const firstSquare = mount(<Board {...boardProps} />).find(Square).first();
    expect(firstSquare.prop('squareVal')).toBe('');

    const boardPropsFilled = {
      squareVals: ['X', 'O', '', '', '', '', '', '', ''],
      onSquareClick: jest.fn()
    };

    const wrapper = mount(<Board {...boardPropsFilled} />);
    const firstSquareFilled = wrapper.find(Square).first();
    const secondSquareFilled = wrapper.find(Square).at(1);
    const thirdSquareFilled = wrapper.find(Square).at(2);

    expect(firstSquareFilled.prop('squareVal')).toBe('X');
    expect(secondSquareFilled.prop('squareVal')).toBe('O');
    expect(thirdSquareFilled.prop('squareVal')).toBe('');
  });

  it('should render 9 squares', () => {
    const wrapper = mount(<Board {...boardProps} />);
    const squares = wrapper.find(Square);

    expect(squares).toHaveLength(9);
  });
});
