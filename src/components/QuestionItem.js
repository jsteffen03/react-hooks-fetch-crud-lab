import React from "react";

function QuestionItem({ question, handleDelete, handleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleSelectChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    handleUpdate(id, newCorrectIndex);
  }



  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleSelectChange}>{options}</select>
      </label>
      <button onClick={()=>handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
