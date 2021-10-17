import { doc, runTransaction } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import {
  incrementExercicesDone,
  setGoodAnswers,
  setMistakes,
  setTimePassed,
  setUserLevel,
  userDataStored,
} from "../../store/appSlice";
import { convertAndGetTime, sendToastLevelUp } from "../../utils/utils";

function ExercicePresentSimple() {
  const history = useHistory();
  //timer values
  const [initialTime, setInitialTime] = React.useState(1.59);
  const [secondes, setSecondes] = React.useState(59);
  const [minutes, setMinutes] = React.useState(1);

  //timer
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
          submitAnswers();
          return;
        }
      } else {
        setSecondes(secondes - 1);
      }
    }, 1000);
  }, [secondes]);

  const dispatch = useDispatch();
  const [googleUser] = useAuthState(auth);

  const [userAnswers, setUserAnswers] = React.useState({
    ans1: "",
    ans2: "",
    ans3: "",
  });

  //data user
  const dataUser = useSelector(userDataStored);

  const [dataExercise, setDataExercise] = React.useState({
    mistakes: 0,
    nbField: 3,
    duration: 1.59,
    xp: 150,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAnswers({ ...userAnswers, [name]: value });
  };

  const submitAnswers = async (e) => {
    e.preventDefault();
    //check answers
    if (userAnswers.ans1.toString().toLowerCase() !== "are") {
      setDataExercise({ ...dataExercise, mistakes: dataExercise.mistakes++ });
    }
    if (!userAnswers.ans2.toString().toLowerCase() !== "am") {
      setDataExercise({ ...dataExercise, mistakes: dataExercise.mistakes++ });
    }
    if (!userAnswers.ans3.toString().toLowerCase() !== "is") {
      setDataExercise({ ...dataExercise, mistakes: dataExercise.mistakes++ });
    }
    //get userRef from db
    const userRef = doc(db, "users", googleUser.uid);
    if (dataExercise.mistakes > 0) {
      toast.info(
        `Oh, you made ${dataExercise.mistakes} mistakes try again later !`,
      );
      //update user profile
      try {
        console.log("some mistakes");
        await runTransaction(db, async (transaction) => {
          const userDoc = await transaction.get(userRef);
          if (!userDoc.exists()) throw "Document dos not exist.";
          //set time passed
          const timeToAdd = convertAndGetTime(initialTime);
          //TODO : PATCH ERROR NAN ON UPDATE FIELD
          transaction.update(userRef, {
            timePassed: parseInt(dataUser.timePassed) + timeToAdd,
          });
          dispatch(setTimePassed(timeToAdd));
          //give him full xp / mistakes
          const newUserExp =
            userDoc.data().xp +
            dataExercise.xp -
            (dataExercise.mistakes * dataExercise.xp) / dataExercise.nbField;
          transaction.update(userRef, { xp: newUserExp });
          toast.info(
            `You finished the exercise and earn ${
              dataExercise.xp -
              (dataExercise.mistakes * dataExercise.xp) / dataExercise.nbField
            }xp`,
          );
          //set exercise completed of user
          transaction.update(userRef, {
            exercicesDone: dataUser.exercicesDone + 1,
          });
          //set mistakes
          const newUserMistakes =
            userDoc.data().totalMistakes + dataExercise.mistakes;
          transaction.update(userRef, { totalMistakes: newUserMistakes });
          dispatch(setMistakes(newUserMistakes));
          //set good answers
          const newUserGoodAnswers =
            userDoc.data().totalGoodAnswer +
            dataExercise.nbField -
            dataExercise.mistakes;
          transaction.update(userRef, { totalGoodAnswer: newUserGoodAnswers });
          dispatch(setGoodAnswers(newUserGoodAnswers));
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
        //history.push("/profile");
      } catch (error) {
        console.log("Transaction failed", error);
      }
    } else {
      console.log("no mistakes");
      toast.info("Congratz you passed it without mistakes !");
      try {
        await runTransaction(db, async (transaction) => {
          const userDoc = await transaction.get(userRef);
          if (!userDoc.exists()) throw "Document dos not exist.";
          //set time passed
          const timeToAdd = convertAndGetTime(initialTime);
          //TODO : PATCH ERROR NAN ON UPDATE FIELD
          //console.log("time to add : ", timeToAdd); => return good number
          transaction.update(userRef, {
            timePassed: parseInt(dataUser.timePassed) + timeToAdd,
          });
          dispatch(setTimePassed(timeToAdd));
          //xp
          const newUserExp = userDoc.data().xp + dataExercise.xp;
          transaction.update(userRef, { xp: newUserExp });
          toast.info(`You finished the exercise and earn ${dataExercise.xp}xp`);
          //set exercise completed of user
          transaction.update(userRef, {
            exercicesDone: dataUser.exercicesDone + 1,
          });
          //set redux store with incremented value of exercicesDone
          dispatch(incrementExercicesDone());
          //set good answers
          const newUserGoodAnswers =
            userDoc.data().totalGoodAnswer + dataExercise.nbField;
          transaction.update(userRef, { totalGoodAnswer: newUserGoodAnswers });
          dispatch(setGoodAnswers(newUserGoodAnswers));
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
        //history.push("/profile");
      } catch (error) {
        console.log("Transaction failed", error);
      }
    }
    return;
  };

  return (
    <div className="flex-1 flex flex-col bg-third pl-20 pr-20 pt-10 pb-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl mb-5">Exercice 1 : Present simple</h1>
        {/*  timer */}
        <h3 className="text-3xl font-semibold text-secondary">
          {minutes + " : " + secondes}
        </h3>
      </div>
      <form onSubmit={submitAnswers}>
        <p className="text-black mb-5">
          Hello how{" "}
          <input
            name="ans1"
            type="text"
            className="rounded-xl bg-white ring ring-success text-black py-2 px-3 mr-2"
            value={userAnswers.ans1}
            onChange={handleChange}
          />
          you bobby ?
        </p>
        <p className="text-black mb-5">
          Oh hi John, I{" "}
          <input
            name="ans2"
            type="text"
            className="rounded-xl bg-white ring ring-success text-black py-2 px-3 mr-2"
            value={userAnswers.ans2}
            onChange={handleChange}
          />
          fine thank you ! Where is Rodolphe ?
        </p>
        <p className="text-black mb-5">
          I've seen him, he{" "}
          <input
            name="ans3"
            type="text"
            className="rounded-xl bg-white ring ring-success text-black py-2 px-3 mr-2"
            value={userAnswers.ans3}
            onChange={handleChange}
          />
          in the supermarket.
        </p>
        <button type="submit" className="btn-inline">
          Send my answers !
        </button>
      </form>
    </div>
  );
}

export default ExercicePresentSimple;
