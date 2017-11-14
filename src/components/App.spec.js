import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import App from './App';
import Square from './Square';
import Message from './Message';

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('should match snapshot', () => {
    const tree = renderer.create(
      <App />
    ).toJSON();

    expect(tree).toMatchSnapshot();
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

/*************************************************************************
* TODO: revamp to use setState rather than manipulating state directly
**************************************************************************/
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
  });
});

describe('calculateWinner', () => {

  it('should return empty string if there is no winner', () => {
    const wrapperInstance = shallow(<App />).instance();
    const winner = wrapperInstance.calculateWinner(wrapperInstance.state.squareVals);
    expect(winner).toBe('');
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

describe('squaresAvailable', () => {
  it('should return true when no squares have been clicked', () => {
    const wrapperInstance = shallow(<App />).instance();

    expect(wrapperInstance.squaresAvailable()).toBe(true);
  });

  it('should return false when all squares have been filled', () => {
    const wrapperInstance = shallow(<App />).instance();
    const filledSquareVals = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const squareVals = wrapperInstance.state.squareVals = filledSquareVals;

    expect(wrapperInstance.squaresAvailable()).toBe(false);
  });
});
