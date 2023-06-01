import { createStore } from 'redux';

const initialState = {
  id: localStorage.getItem('userId') || null,
};

export const saveUserIdAction = (id) => ({
  type: 'SAVE_USER_ID',
  payload: id,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_ID':
      // Save the userId in localStorage
      localStorage.setItem('userId', action.payload);
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
