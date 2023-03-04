import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Initialize with 0


  useEffect(() => {
    async function fetchQuestions() {
      const questionIds = [
        "AreaUnderTheCurve_1",
        "AreaUnderTheCurve_2",
        "BinomialTheorem_3",
        "BinomialTheorem_4",
        "AreaUnderTheCurve_5"
      ];

      const fetchedQuestions = await Promise.all(
        questionIds.map(async (id) => {
          const response = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${id}`);
          const data = await response.json();
          console.log(data,"chanukya")
          return data[0].Question;
        })
      );

      setQuestions(fetchedQuestions);
    }

    fetchQuestions();
  }, []);

  function handleNextQuestion() {
    setCurrentQuestion(currentQuestion + 1);
  }

  function handlePreviousQuestion() {
    setCurrentQuestion(currentQuestion - 1);
  }

  return (
    <div>
      <h1>Mathematics Questions</h1>
      {questions?.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <div>
          <MathJaxContext>
            <MathJax>{questions[currentQuestion]}</MathJax>
          </MathJaxContext>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous Question
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default App;



