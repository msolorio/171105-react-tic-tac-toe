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
  it('should update state when called', () => {
    const wrapperInstance = shallow(<App />).instance();
    wrapperInstance.handleSquareClick(0);
    expect(wrapperInstance.state.squareVals[0]).toBe('X');
    expect(wrapperInstance.state.xIsNext).toBeFalsy;
  });
});

describe('calculateWinner', () => {
  it('should return null if there is no winner', () => {
    const wrapperInstance = shallow(<App />).instance();
    const winner = wrapperInstance.calculateWinner(wrapperInstance.state.squareVals);
    expect(winner).toBe(null);
  });

  it('should return a winner if one exists in state', () => {
    const wrapperInstance = mount(<App />).instance();
    wrapperInstance.handleSquareClick(0);
    wrapperInstance.handleSquareClick(1);
    wrapperInstance.handleSquareClick(3);
    wrapperInstance.handleSquareClick(4);
    wrapperInstance.handleSquareClick(6);
    wrapperInstance.handleSquareClick(7);
    const winner = wrapperInstance.calculateWinner();
    expect(winner).toBe('X');
  });
});
