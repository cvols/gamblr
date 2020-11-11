import fire from '../fire';
import { TYPES } from './types';

export const initialState = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  logout: () => fire.auth().signOut(),
  user: null
};

export default (state, action) => {
  const { SET_USER, CLEAR_USER } = TYPES;

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case CLEAR_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
