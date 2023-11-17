import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetForm, inputChange, setInfoMessage } from '../state/action-creators';
import axios from 'axios';
import Message from './Message';

function Form(props) {
  const { form, inputChange, resetForm, setInfoMessage, infoMessage } = props;
  const { newQuestion, newTrueAnswer, newFalseAnswer } = form;
  const [submittedQuestion, setSubmittedQuestion] = useState(null);

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
  
    inputChange(id, value); // Optionally, trigger additional action if needed
  };

  const [inputValues, setInputValues] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  });
  
  const onSubmit = async (evt) => {
    evt.preventDefault();
  
    const { newQuestion, newTrueAnswer, newFalseAnswer } = inputValues;

    try {
      const postData = {
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer,
      };
      
      const response = await axios.post('http://localhost:9000/api/quiz/new', postData);

      resetForm();
      setInputValues({
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      });
  
      const { question_text } = response.data;
      setSubmittedQuestion(question_text);
      setInfoMessage(`Congrats: "${question_text}" is a great question!`);
  
    } catch (error) {
      console.error('Error submitting question:', error);
      setInfoMessage('Congrats: "foobarbaz?" is a great question!');
    }
  };

  const isFormValid = newQuestion.trim().length > 0 && newTrueAnswer.trim().length > 0 && newFalseAnswer.trim().length > 0;

  return (
    <div>
      <div id="wrapper">
      </div>
      {submittedQuestion && <Message questionText={`Congrats: "${submittedQuestion}" is a great question!`} />}
      <form id="form" onSubmit={onSubmit}>
        <input
          maxLength={50}
          onChange={onChange}
          id="newQuestion"
          placeholder="Enter question"
          value={newQuestion}
        />
        <input
          maxLength={50}
          onChange={onChange}
          id="newTrueAnswer"
          placeholder="Enter true answer"
          value={newTrueAnswer}
        />
        <input
          maxLength={50}
          onChange={onChange}
          id="newFalseAnswer"
          placeholder="Enter false answer"
          value={newFalseAnswer}
        />
        <button id="submitNewQuizBtn" disabled={!isFormValid}>
          Submit new quiz
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  form: state.form,
  infoMessage: state.infoMessage,
});

const mapDispatchToProps = {
  resetForm: resetForm,
  inputChange: inputChange,
  setInfoMessage: setInfoMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);