const INITIAL_STATE = {
  wakeupWeek: null,
  wakeupWeekend: null,
  bedtimeWeek: null,
  bedtimeWeekend: null,
  workday: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  workMorningStart: null,
  workMorningEnd: null,
  workAfternoonStart: null,
  workAfternoonEnd: null,
};

export default function SettingsReducer(state = INITIAL_STATE, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_WAKEUPWEEK':
      nextState = {
        ...state,
        wakeupWeek: action.value,
      };
      return nextState;
    case 'TOGGLE_WAKEUPWEEKEND':
      nextState = {
        ...state,
        wakeupWeekend: action.value,
      };
      return nextState;
    case 'TOGGLE_BEDTIMEWEEK':
      nextState = {
        ...state,
        bedtimeWeek: action.value,
      };
      return nextState;
    case 'TOGGLE_BEDTIMEWEEKEND':
      nextState = {
        ...state,
        bedtimeWeekend: action.value,
      };
      return nextState;
    case 'TOGGLE_WORKMORNINGSTART':
      nextState = {
        ...state,
        workMorningStart: action.value,
      };
      return nextState;
    case 'TOGGLE_WORKMORNINGEND':
      nextState = {
        ...state,
        workMorningEnd: action.value,
      };
      return nextState;
    case 'TOGGLE_WORKAFTERNOONSTART':
      nextState = {
        ...state,
        workAfternoonStart: action.value,
      };
      return nextState;
    case 'TOGGLE_WORKAFTERNOONEND':
      nextState = {
        ...state,
        workAfternoonEnd: action.value,
      };
      return nextState;
    case 'TOGGLE_WORKDAY':
      switch (action.value) {
        case 'MONDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              monday: !state.workday.monday,
            },
          };
          break;
        case 'TUESDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              tuesday: !state.workday.tuesday,
            },
          };
          break;
        case 'WEDNESDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              wednesday: !state.workday.wednesday,
            },
          };
          break;
        case 'THURSDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              thursday: !state.workday.thursday,
            },
          };
          break;
        case 'FRIDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              friday: !state.workday.friday,
            },
          };
          break;
        case 'SATURDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              saturday: !state.workday.saturday,
            },
          };
          break;
        case 'SUNDAY':
          nextState = {
            ...state,
            workday: {
              ...state.workday,
              sunday: !state.workday.sunday,
            },
          };
          break;
        default:
          return nextState;
      }
      return nextState;
    default:
      return state;
  }
}
