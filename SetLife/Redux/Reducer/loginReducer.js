// Reducer/loginReducer.js

import users from '../../security/userData';

const initialState = { login: [] };

export default function connection(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'LOG_IN':
      let exist = typeof users.find(user => user.login === action.value.login) === 'undefined' ? false : true;
      if(exist) {
        let user = users.find(user => user.login === action.value.login);
        console.log(action.value.login);
        if(action.value.login === '') {
          console.log("Veuiller rensigner le login.");
        } else if(action.value.password === '') {
          console.log("Veuillez rensigner le mot de passe.");
        } else if (action.value.password === user.password) {
          console.log("Le mots de passe renseigné est corréct.");
          this.props.navigation.navigate('Home');
        } else {
          console.log("Le mots de passe renseigné n'est pas corrécte.");
        }
      }
      nextState = {
        ...state,
        connection: [...state.connection],
      };
      return nextState || state;
    default:
      return state;
  }
}
