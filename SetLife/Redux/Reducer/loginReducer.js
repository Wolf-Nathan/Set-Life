// Reducer/loginReducer.js

import users from '../../data/userData';

const initialState = { connection: [], logged: false, username: "", emptyFields: false, userExist: true, wrongPassword: false };

export default function connection(state = initialState, action) {
  let nextState;
  let username = "";
  switch (action.type) {
    case 'LOG_IN':
      let loggedAction = false;
      let emptyFieldsAction = false;
      let userExistAction = false;
      let wrongPasswordAction = false;
      let user = users.find(user => user.login.toLowerCase() === action.value.login.toLowerCase());
      
      if(action.value.password === '' || action.value.login === '') {
        emptyFieldsAction = true;
      } else {
        emptyFieldsAction = false;
        if(user) {
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
        username: username,
        userExist: userExistAction,
        wrongPassword: wrongPasswordAction
      };      
      return nextState;
    default:
      return state;
  }
}
