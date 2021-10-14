import { toast } from "react-toastify";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUpDataCurrentExercise,
  dataCurrentExercise,
  incrementExercicesDone,
  setIsOpenModalExercice,
  setTimePassed,
  setUserLevel,
  userDataStored,
} from "../store/appSlice";
import { doc, runTransaction } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ModalExercice() {
  const dispatch = useDispatch();
  const [googleUser] = useAuthState(auth);

  //data exercise
  const dataExercise = useSelector(dataCurrentExercise);
  //data user
  const dataUser = useSelector(userDataStored);

  const convertAndGetTime = () => {
    const times = initialTime.toString().split(".");
    times[0] = times[0] * 60; // convert minutes to seconds
    const totalTime = times[0] + parseInt(times[1]);
    return parseInt(totalTime);
  };

  React.useEffect(() => {
    //setTimerMin and setTimerSec with duration value
    const { duration } = dataExercise;
    setInitialTime(duration);
    const times = duration.toString().split(".");
    const min = times[0];
    const sec = times[1];
    setMinutes(min);
    setSecondes(sec);
    return;
  }, []);

  //------ timer -----
  // The state for our timer
  const [initialTime, setInitialTime] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [secondes, setSecondes] = React.useState(10);

  React.useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (secondes === 0) {
        if (minutes !== 0) {
          setSecondes(59);
          setMinutes(minutes - 1);
        } else {
          //timer done
          //send answer
          sendAnswers();
          return;
        }
      } else {
        setSecondes(secondes - 1);
      }
    }, 1000);
  }, [secondes]);

  //---- modal ----

  const cancelButtonRef = React.useRef();

  const closeModal = () => {
    //close the modal
    dispatch(setIsOpenModalExercice());
    dispatch(cleanUpDataCurrentExercise());
  };

  //---- send data ----

  const sendToastLevelUp = (value) => {
    toast.info(`Congratulation, you are now at ${value} level, keep going !`);
  };

  const sendAnswers = async () => {
    //check for answers

    //if all good answers give xp to the user
    try {
      //TODO : check mistakes and good answers

      //give xp to the user
      const userRef = doc(db, "users", googleUser.uid);
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) throw "Document dos not exist.";
        //set time passed
        const timeToAdd = convertAndGetTime();
        const newUserTimePassed = userDoc.data().timePassed + timeToAdd;
        transaction.update(userRef, {
          timePassed: dataUser.timePassed + timeToAdd,
        });
        dispatch(setTimePassed(timeToAdd));
        const newUserExp = userDoc.data().xp + dataExercise.xp;
        transaction.update(userRef, { xp: newUserExp });
        toast.info(`You finished the exercise and earn ${dataExercise.xp}`);
        //set exercise completed of user
        transaction.update(userRef, {
          exercicesDone: dataUser.exercicesDone + 1,
        });
        //set redux store with incremented value of exercicesDone
        dispatch(incrementExercicesDone());
        //potentialy set level of user
        const actualLevel = dataUser.level;
        //Intermediate level
        if (newUserExp >= 150 && actualLevel === "Beginner") {
          const level = "Intermediate";
          transaction.update(userRef, { level });
          sendToastLevelUp(level);
          //set redux store with new level value
          dispatch(setUserLevel(level));
        }
        //Pro lvl
        if (newUserExp >= 300 && actualLevel === "Intermediate") {
          const level = "Pro";
          transaction.update(userRef, { level });
          sendToastLevelUp(level);
          //set redux store with new level value
          dispatch(setUserLevel(level));
        }
      });
    } catch (error) {
      console.log("Transaction failed", error);
    }
    closeModal();
    return false;
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-1/2">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t items-center">
              <h3 className="text-3xl font-semibold">Exercice Name</h3>
              {/* Timer */}
              <h3 className="text-3xl font-semibold text-secondary">
                {minutes + " : " + secondes}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {/* Questions | Exercice */}
              {dataExercise.data.map((exo) => {
                return (
                  <>
                    <h2 className="question" key={exo.question}>
                      {exo.question}
                    </h2>
                    <ul className="mb-5">
                      {exo.answers.map((answer) => (
                        <li className="answer" key={answer}>
                          <input type="checkbox" />
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </>
                );
              })}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Cancel exercise
              </button>
              <button className="btn-inline" onClick={sendAnswers}>
                Send my answers
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalExercice;
