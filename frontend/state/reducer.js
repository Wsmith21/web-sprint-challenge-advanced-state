import { combineReducers } from 'redux';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types';

const initialWheelState = 0;

function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case MOVE_COUNTERCLOCKWISE:
      return (state + 5) % 6;
    default:
      return state;
  }
}

const initialQuizState = null;

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload;
    case SET_QUIZ_INTO_STATE:
      return initialSelectedAnswerState; // Reset selected answer when a new quiz is set
    default:
      return state;
  }
}

const initialMessageState = '';

function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    case RESET_FORM:
      return initialMessageState; // Reset the message when the form is reset
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};

function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case RESET_FORM:
      return initialFormState; // Reset the form state
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer, // Include the selectedAnswer in the combineReducers
  infoMessage,
  form,
});