import React from 'react';

export default function Message({ correct, questionText }) {
  return (
    <div id="message">
      {questionText ? ( // Render for Form component
        <div>{questionText}</div>
      ) : (
        <div>
          {correct !== undefined ? ( // Render for Quiz component
            correct ? "Nice job! That was the correct answer" : "What a shame! That was the incorrect answer"
          ) : null}
        </div>
      )}
    </div>
  );
}
