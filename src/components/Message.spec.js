import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Message from './Message';


describe('Message', () => {
  it('should match snapshot', () => {
    const messageProps = {
      winner: '',
      squaresAvailable: true,
      xIsNext: true
    };
    const tree = renderer.create(<Message {...messageProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should display the correct player\'s turn during gameplay', () => {

    const testCases = [
      {
        xIsNext: true,
        text: 'Player\'s turn: X'
      },
      {
        xIsNext: false,
        text: 'Player\'s turn: O'
      }
    ];

    testCases.forEach((testCase) => {
      const messageProps = {
        winner: '',
        squaresAvailable: true,
        xIsNext: testCase.xIsNext
      };
      const message = shallow(<Message {...messageProps} />);

      expect(message.text()).toBe(testCase.text);
    });
  });

  it('should display the correct message if there is a winner', () => {
    const testCases = [
      {
        winner: 'X',
        xIsNext: false,
        text: 'Winner: X'
      },
      {
        winner: 'O',
        xIsNext: false,
        text: 'Winner: O'
      },
      {
        winner: 'X',
        xIsNext: true,
        text: 'Winner: X'
      },
      {
        winner: 'O',
        xIsNext: true,
        text: 'Winner: O'
      }
    ];

    testCases.forEach((testCase) => {
      const messageProps = {
        winner: testCase.winner,
        squaresAvailable: true,
        xIsNext: testCase.xIsNext
      };
      const message = shallow(<Message {...messageProps} />);

      expect(message.text()).toBe(testCase.text);
    });
  });

  it('should display the correct message if there are no squares available', () => {
    const messageProps = {
      winner: '',
      xIsNext: true,
      squaresAvailable: false
    };

    const message = shallow(<Message {...messageProps} />);

    expect(message.text()).toBe('Game over. There are no available squares.')
  });
});
