import React, { useState, useEffect, createContext, useContext } from 'react';
import Message from './Message';

const QuizContext = createContext(); // Create a context for quiz data and selected answer

function QuizComponent() {
  const [quizData, setQuizData] = useState(() => {
    const storedQuizData = sessionStorage.getItem('quizData');
    return storedQuizData ? JSON.parse(storedQuizData) : null;
  });

  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    const storedSelectedAnswer = sessionStorage.getItem('selectedAnswer');
    return storedSelectedAnswer || null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    fetchNextQuiz();
  }, []);
  

  const fetchNextQuiz = async () => {
    if (!quizData) {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:9000/api/quiz/next');
        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          // Handle error or no quiz available
        }
      } catch (error) {
        // Handle fetch error
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer) {
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/api/quiz/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_id: quizData.quiz_id,
          answer_id: selectedAnswer,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Answer submitted successfully!');

        try {
          const nextQuizResponse = await fetch('http://localhost:9000/api/quiz/next');
          if (nextQuizResponse.ok) {
            const nextQuizData = await nextQuizResponse.json();
            setQuizData(nextQuizData);
            setSelectedAnswer(null);
            const isCorrect = true; // Replace with logic to check correctness based on the response
            setCorrectAnswer(isCorrect);
          } else {
            // Handle error in fetching the next quiz
          }
        } catch (error) {
          // Handle fetch error for the next quiz
        }
      } else {
        // Handle error in submitting the answer
        setCorrectAnswer(false);
      }
    } catch (error) {
      // Handle fetch error
    }
  };

  // Wrap the state values in context provider
  return (
    <QuizContext.Provider value={{ quizData, selectedAnswer, isLoading, successMessage, correctAnswer, handleAnswerSelect, handleAnswerSubmit }}>
      <div id="wrapper">
        <div id="message">
          {correctAnswer !== null && <Message correct={correctAnswer} />}
        </div>

        {isLoading ? (
          'Loading next quiz...'
        ) : quizData ? (
          <>
            <h2>{quizData.question}</h2>

            <div id="quizAnswers">
              {quizData.answers.map((answer) => (
                <div
                  key={answer.answer_id}
                  className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(answer.answer_id)}
                >
                  {answer.text}
                  <button>{selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}</button>
                </div>
              ))}
            </div>

            <button id="submitAnswerBtn" onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
              Submit answer
            </button>

            {successMessage && <div>{successMessage}</div>}
          </>
        ) : (
          'Loading next quiz...'
        )}
      </div>
    </QuizContext.Provider>
  );
}
export const useQuizContext = () => {
  return useContext(QuizContext);
};

export default QuizComponent;