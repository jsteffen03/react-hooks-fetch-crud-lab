import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then(data=>setData(data))
    }
  ,[])

  function addQuestion(newQuestion){
    setData([...data, newQuestion])
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        setData(data.filter((data) => data.id !== id));
      })
  }

  function handleUpdate(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((updatedQuestion) => {
        // Update state to reflect the updated question
        setData(
          data.map((data) =>
            data.id === updatedQuestion.id ? updatedQuestion : data
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList data={data} handleDelete={handleDelete} handleUpdate={handleUpdate}/>}
    </main>
  );
}

export default App;
