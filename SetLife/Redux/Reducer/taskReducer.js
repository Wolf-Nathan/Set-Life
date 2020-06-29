// Reducer/taskReducer.js

const initialState = { taskList: [] };

/**
 * Function manage taskReducer.
 * @param state
 * @param action
 * @returns {{taskList: *[]}|{taskList: []}|{taskList: ([]|*[])}}
 */
function toggleTaskList(state = initialState, action) {
  let nextState;
  let task;
  let taskListIndex;
  let nextTaskList;
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
      task = action.value;
      taskListIndex = state.taskList.findIndex((item) => item.id === task.id);
      nextTaskList = state.taskList;
      nextTaskList[taskListIndex] = task;
      nextState = {
        ...state,
        taskList: nextTaskList,
      };
      return nextState || state;
    case 'DELETE_TASK':
      task = action.value;
      taskListIndex = state.taskList.findIndex((item) => item.id === task.id);
      nextTaskList = state.taskList;
      nextTaskList.splice(taskListIndex, 1);
      nextState = {
        ...state,
        taskList: nextTaskList,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default toggleTaskList;
