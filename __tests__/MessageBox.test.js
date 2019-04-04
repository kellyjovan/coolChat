import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import MessageBox from '../client/components/MessageBox';
import { createMessage } from '../client/schema/mutations.js';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: {
      query: createMessage,
      variables: {
        message: 'example',
      },
    },
    result: {
      data: {
        MessageResponse: { success: true, message: 'example' },
      },
    },
  },
];

describe('MessageBox Component: ', () => {
  let wrapper;
  const clickFn = jest.fn();
  beforeAll(() => {
    wrapper = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MessageBox handleSend={clickFn} />
      </MockedProvider>,
    );
  });

  it.skip('Should render messageBox div', () => {
    expect(wrapper.find('.messageBox')).toHaveLength(1);
  });

  it('should render loading state initially', () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks}>
        <MessageBox handleSend={clickFn} />
      </MockedProvider>,
    );
    const tree = component.toJSON().children[0];
    console.log(tree);
    expect(tree.children).toContain('Loading...');
  });

  it.skip('Should render one button', () => {
    const msgBoxDiv = wrapper.find('.messageBox');
    expect(msgBoxDiv.find('button')).toHaveLength(1);
  });

  describe('Send Button:', () => {
    it.skip('Should be a button', () => {
      const sendBtn = wrapper.find('#sendBtn');
      expect(sendBtn.type()).toEqual('button');
    });

    it.skip('Send button should trigger fn call on click', () => {
      const sendBtn = wrapper.find('#sendBtn');
      sendBtn.simulate('click');
      expect(clickFn.mock.calls.length).toBe(1);
    });
  });

  describe('Input', () => {
    it.skip('Should have a text input', () => {
      const textInput = wrapper.find('Mutation');
      expect(textInput).toHaveLength(1);
    });
  });
}); // end of test
