import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../client/components/Header';

configure({ adapter: new Adapter() });

describe('Header Component', () => {
  let wrapper;
  const clickFn = jest.fn();
  beforeAll(() => {
    wrapper = shallow(
      <Header
        username="TurnCycle02"
        revokeToken={clickFn}
      />,
    );
  });

  it('Should contain a div with the id header', () => {
    expect(wrapper.find('#header')).toHaveLength(1);
  });

  describe('Title', () => {
    it('Should display the app\'s title', () => {
      expect(wrapper.find('#title')).toHaveLength(1);
      expect(wrapper.find('#title').childAt(0).text()).toEqual('Cool Chat');
    });
  });

  describe('Username', () => {
    it('Should not display user\'s name prop is empty', () => {
      const testWrapper = shallow(<Header username="" revokeToken={clickFn} />);
      expect(testWrapper.find('#username')).toHaveLength(0);
    });

    it('Should display user\'s name', () => {
      expect(wrapper.find('#username')).toHaveLength(1);
      expect(wrapper.find('#username').childAt(0).text()).toBe('TurnCycle02');
    });
  });

  describe('Logout Button', () => {
    it('Should exist', () => {
      expect(wrapper.find('#logout')).toHaveLength(1);
      expect(wrapper.find('#logout').childAt(0).text()).toBe('Logout');
    });

    it('Should invoke fn on click', () => {
      wrapper.find('#logout').simulate('click');
      expect(clickFn).toHaveBeenCalled();
    });
  });
});
