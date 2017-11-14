import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Square from './Square';

const squareProps = {
  index: 0,
  squareVal: '',
  onSquareClick: jest.fn()
};

describe('Square', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(
      <Square {...squareProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render squareVal props as text within each square', () => {
    const squareVals = ['X', 'O', ''];

    squareVals.forEach((val) => {
      const testProps = {
        index: 3,
        squareVal: val,
        onSquareClick: jest.fn()
      };

      const square = shallow(<Square {...testProps} />);
      expect(square.text()).toBe(testProps.squareVal);
    });
  });

  it('should call props.onSquareClick with the square index on square click', () => {
    for (let i=0; i<9; i++) {
      const testProps = {
        index: i,
        squareVal: '',
        onSquareClick: jest.fn()
      };

      const square = shallow(<Square {...testProps} />);
      square.simulate('click');
      expect(testProps.onSquareClick.mock.calls.length).toBe(1);
      /*
      * expect first argument of first call of onSquareClick
      * to be index value passed as props
      */
      expect(testProps.onSquareClick.mock.calls[0][0]).toBe(i);
    }
  });
});
