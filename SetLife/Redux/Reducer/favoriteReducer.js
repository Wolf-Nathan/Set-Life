const initState = { favoritesTasks: [] };

function toggleFavorite(state = initState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      // eslint-disable-next-line no-case-declarations
      const favoriteTaskIndex = state.favoritesTasks.findIndex(
        (item) => item.id === action.value.id
      );
      if (favoriteTaskIndex !== -1) {
        // delete task from favorite list
        nextState = {
          ...state,
          favoriteTask: state.favoritesTasks.filter((item, index) => index !== favoriteTaskIndex),
        };
      } else {
        // add task to favorite list
        nextState = {
          ...state,
          favoriteTask: [...state.favoritesTasks, action.value],
        };
      }
      return nextState || state;
    default:
      return state;
  }
}

export default toggleFavorite;
