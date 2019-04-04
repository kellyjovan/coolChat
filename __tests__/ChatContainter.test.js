import 'jsdom-global/register';
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';
import MessageBox from '../client/components/MessageBox';
import ChatContainer from '../client/components/ChatContainer';
import Msg from '../client/components/Msg';
import { findNodeModule } from 'jest-resolve';
import { JestEnvironment } from '@jest/environment';

configure({ adapter: new Adapter() });

describe('Chat Container:', () => {
  let wrapper;
  const props = {
    data: {
      messages: [
        {
          username: 'bo',
          message: 'hello',
        },
        {
          username: 'bryan',
          message: 'hi',
        },
      ],
    },
    subscribeToMore: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<ChatContainer {...props} />);
  });

  it('Should render chatContainer div', () => {
    expect(wrapper.find('#chatContainer')).toHaveLength(1);
  });

  it('Should render allMsgs div', () => {
    expect(wrapper.find('#allMsgs')).toHaveLength(1);
  });

  it('Should render MessageBox div', () => {
    const chatDiv = wrapper.find('#chatContainer');
    expect(chatDiv.find(MessageBox)).toHaveLength(1);
  });

  it('The number of Msg should equal props.data.messages.length', () => {
    // console.log(wrapper.find(Msg).children().to.have.length)
    expect(wrapper.find(Msg).length).toEqual(props.data.messages.length);
  })

  xit('Component did mount should be called and subscribe to more should be called', () => {
    let spy = jest.spyOn(props, 'subscribeToMore')

    const fullWrapper = mount(< ChatContainer {...props} />)
    // expect(ChatContainer.prototype.componentDidMount).to.have.property('callCount', 1)
    expect(spy).toHaveBeenCalled()
    spy.mockClear();
  })
}); // end of test

