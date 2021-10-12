import React from "react";
import Conjugation from "../components/exercices/Conjugation";
import Qcm from "../components/exercices/Qcm";

function Exercice({ type }) {
  return (
    <>
      {type === "qcm" ? (
        <Qcm />
      ) : type === "conjugation" ? (
        <Conjugation />
      ) : null}
    </>
  );
}

export default Exercice;
