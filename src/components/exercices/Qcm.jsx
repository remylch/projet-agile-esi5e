import React from "react";
import { qcmTest } from "../../data/exercices/qcmTest";

function Qcm({ data }) {
  const { questions, answers, goodAnswer } = data;

  const submitExercice = () => {};
  return (
    <div className="flex flex-1 pl-20 pr-20 pt-10 pb-10">
      {qcmTest.map((question) => {
        return (
          <>
            <h3 className="question" key={question.id}>
              {question.question}
            </h3>
            <ul>
              {question.answers.map((answer) => {
                return (
                  <li className="response" key={answer.id}>
                    {answer.answer}
                  </li>
                );
              })}
            </ul>
            <button className="btn-primary" onClick={submitExercice}>
              Finish my exercise
            </button>
          </>
        );
      })}
    </div>
  );
}

export default Qcm;
