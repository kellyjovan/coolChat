import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatroomContainer from '../client/components/ChatroomContainer';
import Sidebar from '../client/components/Sidebar';
import ChatContainer from '../client/components/ChatContainer';
import { Query, ApolloProvider, RenderPromises } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import renderer from 'react-test-renderer';
import { messageQuery } from '../client/schema/queries';
import { watchFile } from 'fs';
import '@babel/polyfill';

configure({ adapter: new Adapter() });

describe('Chatroom Container Component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<ChatroomContainer />);
  });

  xit('Should render a Sidebar component', () => {
    expect(wrapper.find(Sidebar)).toHaveLength(1);
  });

  it('Query on start should be at loading', () => {
    const mocks = {
        request: { query: messageQuery, }
    };
    const component = renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ChatroomContainer />
      </MockedProvider>
    )
    const tree = component.toJSON();
    expect(tree.children[0]).toContain('loading...');
  });
  it('Query should be error if wrong query', async () => {
    const mocks = {
        request: { query: messageQuery, }
    };
    const component = renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ChatroomContainer />
      </MockedProvider>
    )
    await wait(0);
    const tree = component.toJSON();
    expect(tree.children[0]).toContain(' Error: ');
  });
  xit('Query should return ChatContainer', async () => {
    const mocks = {
      request: { query: messageQuery }, 
      result: {
        data: {
          messages: [
            {
              username: "bo",
              message: "dsfsdfs",
              created_at: "1554230730299"
            }
          ]
        }
      }
    };
    const component = renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ChatroomContainer />
      </MockedProvider>
    )
    await wait(0);
    const tree = component.toJSON();
    expect(tree.props.id).toEqual('chatContainer');
  });
  it('Should render a Query component', () => {
    expect(wrapper.find(Query)).toHaveLength(1);
  });
});
