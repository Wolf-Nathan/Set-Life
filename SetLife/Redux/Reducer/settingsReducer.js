const INITIAL_STATE = {
  wakeupWeek: "08:00",
  wakeupWeekend: "10:00",
<<<<<<< HEAD
  bedtimeWeek: "22:30",
  bedtimeWeekend: "23:30",
=======
  breakfast: "09:00",
  lunch: "12:00",
  dinner: "19:30",
>>>>>>> advancement commit
  workday: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
  workMorningStart: "09:00",
  workMorningEnd: "12:00",
  workAfternoonStart: "13:00",
  workAfternoonEnd: "18:00",
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
