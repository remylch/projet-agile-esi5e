import React, { useEffect } from "react";
import CardStats from "../components/Cards/CardStats";
import { MdTaskAlt } from "react-icons/md";
import { BiTaskX, BiTimer } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import CardCourses from "../components/Cards/CardCourses";
import { useHorizontalScroll } from "../utils/utils";
import ModalExercice from "../components/ModalExercice";
import { useDispatch, useSelector } from "react-redux";
import {
  isOpenModalExercice,
  setUpUserData,
  userDataStored,
} from "../store/appSlice";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsSpeedometer2 } from "react-icons/bs";

function Profile() {
  const dispatch = useDispatch();
  const scrollRef = useHorizontalScroll();

  const [exercises, setExercises] = React.useState([]);

  const isOpenExercice = useSelector(isOpenModalExercice);

  //fetch every time dependancy db changed (if there is an update on the db : INSERT / DELETE / UPDATE ...)
  useEffect(() => {
    //fetch data user from db
    fetchDataUser();
    //fetch exercises from db
    return onSnapshot(collection(db, "exercises"), (snapshot) => {
      setExercises(snapshot.docs);
    });
  }, []);

  //fetch data user
  //connected user
  const [googleUser, loading] = useAuthState(auth);

  //fetch time passed / exercices done / level
  const fetchDataUser = async () => {
    const docRef = doc(db, "users", googleUser.uid);
    const docSnap = await getDoc(docRef);
    dispatch(setUpUserData(docSnap.data()));
  };

  //user state in redux store
  const userData = useSelector(userDataStored);

  return (
    <>
      {isOpenExercice ? <ModalExercice open={isOpenExercice} /> : null}
      <div className="flex-1 flex-col flex pl-20 pr-20 pt-10 pb-10 bg-secondary">
        {/* stats */}
        <h1 className="text-xl text-white mb-5">My stats</h1>
        <div className="flex w-full h-1/3 items-center gap-5 flex-wrap mb-5">
          <CardStats text="Exercices completed" value={userData.exercicesDone}>
            <AiOutlineFileDone className="text-blue-500" size={35} />
          </CardStats>
          <CardStats text="Total good answers" value={userData.totalGoodAnswer}>
            <MdTaskAlt className="text-success" size={35} />
          </CardStats>
          <CardStats text="Total mistakes" value={userData.totalMistakes}>
            <BiTaskX className="text-danger" size={35} />
          </CardStats>
          <CardStats text="Time passed" value={userData.timePassed}>
            <BiTimer size={35} />
          </CardStats>
          <CardStats text="Level" value={userData.level} level>
            <BsSpeedometer2 size={35} />
          </CardStats>
        </div>
        {/* start exercice */}
        <h1 className="text-xl text-white mb-5">Exercices</h1>
        <div className="flex  overflow-x-scroll gap-10" ref={scrollRef}>
          {/* Present simple */}
          {exercises.map((exercise) => {
            const { data, level, time, type, xp, duration, exercicesDone } =
              exercise.data();
            console.log(data);
            const modifiedData = {
              exercicesDone,
              data,
              duration,
              xp,
            };
            return (
              <CardCourses
                key={time}
                name={time}
                level={level}
                data={modifiedData}
                type={type}
                xp={xp}
              />
            );
          })}
          <div className="flex w-40 items-center justify-center">
            <h4 className="text-white">New content coming later...</h4>
          </div>
        </div>
        {/* Vocabulary course */}
        {/* Grammar course */}
      </div>
    </>
  );
}

export default Profile;
