import axios from 'axios';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from './action-types';

// Action creators for the wheel
export const moveClockwise = () => ({
  type: MOVE_CLOCKWISE,
});

export const moveCounterClockwise = () => ({
  type: MOVE_COUNTERCLOCKWISE,
});

// Action creators for the quiz
export const setQuiz = (quiz) => ({
  type: SET_QUIZ_INTO_STATE,
  payload: quiz,
});

export const setSelectedAnswer = (answerId) => ({
  type: SET_SELECTED_ANSWER,
  payload: answerId,
});

export const setInfoMessage = (message) => ({
  type: SET_INFO_MESSAGE,
  payload: message,
});

// Action creators for the form
export const inputChange = (name, value) => ({
  type: INPUT_CHANGE,
  payload: { name, value },
});

export const resetForm = () => ({
  type: RESET_FORM,
});

// New action creator to fetch and set the quiz into state
export const fetchAndSetQuiz = () => {
  return async (dispatch) => {
    try {
      // Make an API request to fetch the quiz data
      const response = await axios.get('http://localhost:9000/api/quiz/next');

      // Dispatch the action to set the fetched quiz into the state
      dispatch(setQuiz(response.data));
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };
};