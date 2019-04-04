import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';
import AuthContainer from '../client/components/AuthContainer';
import { Mutation } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import renderer from 'react-test-renderer';
import { login } from '../client/schema/mutations';
import '@babel/polyfill';

configure({ adapter: new Adapter() });

describe('Auth Container Component: ', () => {
  let wrapper;
  const clickFn = jest.fn();
  beforeAll(() => {
    wrapper = shallow(<AuthContainer
      handleSignUp={clickFn} 
      handleLogin={clickFn}
    />);
  });

  it('Should render an auth div', () => {
    expect(wrapper.find('.auth')).toHaveLength(1);
  });

  xit('Should render two buttons', () => {
    const authDiv = wrapper.find('.auth');
    expect(authDiv.find(Button)).toHaveLength(1);
    expect(authDiv.find(Mutation)).toHaveLength(1);
    expect(authDiv.find(Mutation).childAt(0).text()).toEqual('bo');
    // const mutate = wrapper.find
  });

  describe('Sign Up Button:', () => {
    xit('Should be the first button', () => {
      const signUpBtn = wrapper.find('#signUp');
      expect(signUpBtn).toHaveLength(1);
      // const signUpBtn = authDiv.childAt(3);
      expect(signUpBtn.type()).toEqual(Button);
      expect(wrapper.find(Button).childAt(0).text()).toEqual('Sign Up');
      // expect(signUpBtn.hasClass('signUp')).toBe(true);
    });

    xit('Sign up button should trigger fn call on click', () => {
      const signUpBtn = wrapper.find(Button);
      signUpBtn.simulate('click');
      expect(clickFn).toHaveBeenCalled();
    });
  });

  describe('Inputs', () => {
    it('Should have a username input', () => {
      const usernameInput = wrapper.find('#usernameInput');
      expect(usernameInput).toHaveLength(1);
    });

    it('Should have a password input', () => {
      const passwordInput = wrapper.find('#passwordInput');
      expect(passwordInput).toHaveLength(1);
    });
  });

  describe('Login Button:', () => {
    xit('Should be the second button', async () => {
      const mocks = {
        request: {
          query: login,
          variables: {
            username: 'Bo',
            password: 'password'
          }
        },
        result: { data: { 
          username: 'Bo',
          token: 'BoToken',
          success: true
         }}
      }
      const component = renderer.create(
        <MockedProvider mocks={[mocks]} addTypeName={false}>
          <AuthContainer handleSignUp={clickFn} handleLogin={clickFn} setToken={clickFn}/>
        </MockedProvider>
      );
      // const button = component.root.findByType(Button);
      // button.props.onClick();
      await wait(0);
      const tree = component.toJSON();
      expect(tree).toEqual('somethingrandom')
    });

    xit('Login button should trigger fn call on click', () => {
      const loginBtn = wrapper.find('.login');
      loginBtn.simulate('click');
      expect(clickFn.mock.calls.length).toBe(2);
    });
  });
});
