// Reducer/taskReducer.js

const initialState = { taskList: [] };

function toggleTaskList(state = initialState, action) {
  let nextState;
  // eslint-disable-next-line no-unused-vars
  let task;
  switch (action.type) {
    // Add the task to the list.
    case 'ADD_TASK':
      task = action.value;
      if (state.taskList.length === 0) {
        task.id = 1;
      } else {
        const lastTask = state.taskList[state.taskList.length - 1];
        task.id = lastTask.id + 1;
      }
      nextState = {
        ...state,
        taskList: [...state.taskList, task],
      };
      return nextState || state;
    // Update a task in the list.
    case 'UPDATE_TASK':
      const taskListIndex = state.taskList.findIndex((item) => item.id === action.value.id);
      return nextState || state;
    default:
      return state;
  }
}

export default toggleTaskList;
