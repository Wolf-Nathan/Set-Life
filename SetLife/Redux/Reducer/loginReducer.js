// Reducer/loginReducer.js

import users from '../../data/userData';

const initialState = { connection: [], logged: false, username: "", emptyFields: false};

export default function connection(state = initialState, action) {
  let nextState;
  let username = "";
  switch (action.type) {
    case 'LOG_IN':
      let loggedAction = false;
      let emptyFieldsAction = false;
      let user = users.find(user => user.login === action.value.login);
      
      if(action.value.password === '' || action.value.login === '') {
        emptyFieldsAction = true;
      } else {
        emptyFieldsAction = false;
        if(user) {
          if(action.value.password === '') {
            console.log("Veuillez rensigner le mot de passe.");
          } else if (action.value.password === user.password) {
            loggedAction = true;
            username = user.username;
            console.log("Le mots de passe renseigné est corréct.");
          } else {
            console.log("Le mots de passe renseigné n'est pas corrécte.");
          }
        } else {
          console.log("utilisateur non existant");
        }
      }
      
      nextState = {
        ...state,
        logged: loggedAction,
        emptyFields: emptyFieldsAction,
        username: username
      };      
      return nextState;
    default:
      return state;
  }
}
