import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';
import Square from './Square';
import Message from './Message';

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('should render a message component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Message).length).toBe(1);
  });

  it('should render a board component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Message).length).toBe(1);
  });

});
describe('handleSquareClick', () => {
  it('should update state when called when there is no winner and square is not occupied', () => {
    const wrapperInstance = shallow(<App />).instance();
    wrapperInstance.handleSquareClick(0);

    expect(wrapperInstance.state.squareVals[0]).toBe('X');
    expect(wrapperInstance.state.xIsNext).toBe(false);
  });

  it('should not update state when called on a square already occupied', () => {
    const wrapperInstance = shallow(<App />).instance();
    wrapperInstance.state.squareVals[0] = 'O';
    wrapperInstance.state.xIsNext = true;
    wrapperInstance.handleSquareClick(0);

    expect(wrapperInstance.state.squareVals[0]).toBe('O');
    expect(wrapperInstance.state.xIsNext).toBe(true);
  });

  it('should not update state if there is already a winner', () => {
    const winningCombos = shallow(<App />).instance().winningCombos;

    winningCombos.forEach((combo) => {
      const wrapperInstance = mount(<App />).instance();
      combo.forEach(position => wrapperInstance.state.squareVals[position] = 'O');
      wrapperInstance.state.xIsNext = true;
      wrapperInstance.handleSquareClick(combo[0]);

      expect(wrapperInstance.state.squareVals[combo[0]]).toBe('O');
      expect(wrapperInstance.state.xIsNext).toBe(true);
    });
  })
});

describe('calculateWinner', () => {
  it('should return null if there is no winner', () => {
    const wrapperInstance = shallow(<App />).instance();
    const winner = wrapperInstance.calculateWinner(wrapperInstance.state.squareVals);

    expect(winner).toBe(null);
  });

  it('should return a winner if one exists in state', () => {

    const winningCombos = shallow(<App />).instance().winningCombos;

    winningCombos.forEach((combo) => {
      const wrapperInstance = mount(<App />).instance();
      combo.forEach(position => wrapperInstance.state.squareVals[position] = 'X');

      expect(wrapperInstance.calculateWinner()).toBe('X');
    });
  });
});
