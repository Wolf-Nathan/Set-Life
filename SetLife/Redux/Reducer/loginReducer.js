// Reducer/loginReducer.js

import users from '../../data/userData';

const initialState = {
  logged: false, signUpSuccess: false, username: '', emptyFields: false, userExist: true, wrongPassword: false, confirmPassword: true, loginUsed: false,
};

export default function connection(state = initialState, action) {
  let nextState;
  let username = '';
  let loggedAction = false;
  let signUpSuccessAction = false;
  let emptyFieldsAction = false;
  let wrongPasswordAction = false;
  let userExistAction = false;
  let confirmPasswordAction = true;
  let loginUsedAction = false;
  let user;

  switch (action.type) {
    case 'LOG_IN':
      user = users.find(
        (userKey) => userKey.login.toLowerCase() === action.value.login.toLowerCase(),
      );
      if (action.value.password === '' || action.value.login === '') {
        emptyFieldsAction = true;
      } else {
        emptyFieldsAction = false;
        if (user) {
          userExistAction = true;
          if (action.value.password === user.password) {
            wrongPasswordAction = false;
            loggedAction = true;
            username = user.username;
          } else {
            wrongPasswordAction = true;
          }
        } else {
          userExistAction = false;
        }
      }
      nextState = {
        ...state,
        logged: loggedAction,
        emptyFields: emptyFieldsAction,
        username,
        userExist: userExistAction,
        wrongPassword: wrongPasswordAction,
      };
      return nextState;

    case 'SIGN_UP':
      user = users.find(
        (userKey) => userKey.login.toLowerCase() === action.value.login.toLowerCase(),
      );
      if (action.value.username === '' || action.value.login === '' || action.value.password === '' || action.value.confirmPassword === '') {
        emptyFieldsAction = true;
      } else {
        emptyFieldsAction = false;
        if (user) {
          loginUsedAction = true;
        } else {
          loginUsedAction = false;
          if (action.value.password !== action.value.confirmPassword) {
            confirmPasswordAction = false;
          } else {
            const newUser = {
              login: action.value.login,
              password: action.value.password,
              username: action.value.username,
            };
            users.push(newUser);
            signUpSuccessAction = true;
            console.log(users);
          }
        }
      }
      nextState = {
        ...state,
        emptyFields: emptyFieldsAction,
        loginUsed: loginUsedAction,
        confirmPassword: confirmPasswordAction,
        signUpSuccess: signUpSuccessAction,
      };
      return nextState;

    case 'SIGN_OUT':
      nextState = {
        initialState
      };
      return nextState;
    default:
      return state;
  }
}
