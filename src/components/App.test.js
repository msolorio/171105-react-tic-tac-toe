import React from 'react';
import { shallow } from 'enzyme';
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

  it('should update state when handleSquareClick is called', () => {
    const wrapperInstance = shallow(<App />).instance();
    wrapperInstance.handleSquareClick(0);
    expect(wrapperInstance.state.squareVals[0]).toBe('X');
    expect(wrapperInstance.state.xIsNext).toBeFalsy;
  });
});

// describe('calculateWinner should return null if there is no winner', () => {
//
// });
