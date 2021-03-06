import {
  DONE
} from '../actions/settingsAction';

const defaultSettingsState = {
  enableNotification: true
};

export default function settings(state = defaultSettingsState, action) {
  switch (action.type) {
    case DONE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
