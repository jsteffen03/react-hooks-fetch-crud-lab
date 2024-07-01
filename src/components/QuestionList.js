import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({data, handleDelete, handleUpdate}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> 
        {data.map((question)=>(<QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleUpdate={handleUpdate}/>))}
      </ul>
    </section>
  );
}

export default QuestionList;
