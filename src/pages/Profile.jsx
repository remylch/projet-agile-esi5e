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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Profile() {
  const dispatch = useDispatch();
  const scrollRef = useHorizontalScroll();

  const isOpenExercice = useSelector(isOpenModalExercice);

  //done one time on first load
  useEffect(() => {
    fetchDataUser();
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

  const userData = useSelector(userDataStored);
  console.log(userData);

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
        </div>
        {/* start exercice */}
        <h1 className="text-xl text-white mb-5">Exercices</h1>
        <div className="flex  overflow-x-scroll gap-10" ref={scrollRef}>
          {/* Present simple */}
          <CardCourses name="The simple present" level="easy" />
          <CardCourses name="The present progressive" level="easy" />
          <CardCourses name="The past" level="medium" />
          <CardCourses name="The simple past" level="medium" />
          <CardCourses name="The past continous" level="medium" />
          <CardCourses name="The present perfect" level="medium" />
          <CardCourses name="The present perfect progressive" level="hard" />
          <CardCourses name="The simple future" level="easy" />
          <CardCourses name="The future progressive" level="medium" />
          <CardCourses name="The future perfect" level="hard" />
          <CardCourses name="The passive voice" level="medium" />
          <CardCourses name="The subjunctive" level="medium" />
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
