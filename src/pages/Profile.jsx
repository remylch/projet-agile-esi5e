import React, { useEffect } from "react";
import CardStats from "../components/Cards/CardStats";
import { MdTaskAlt } from "react-icons/md";
import { BiTaskX, BiTimer } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import CardCourses from "../components/Cards/CardCourses";
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
import CardCoursesRefactor from "../components/Cards/CardCoursesRefactor";
import { RiCopperCoinLine } from "react-icons/ri";

//tense map
import tenseMap from "../images/tense-map.png";
import { Link } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();

  const [exercises, setExercises] = React.useState([]);

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
  const [googleUser] = useAuthState(auth);

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
      <div className="flex-1 flex-col flex pl-20 pr-20 pt-10 pb-10 bg-secondary">
        {/* stats */}
        <h1 className="text-xl text-white mb-5">My stats</h1>
        <div className="flex w-full h-1/4 items-center gap-5 mb-5">
          <CardStats text="Exercices completed" value={userData.exercicesDone}>
            <AiOutlineFileDone className="text-blue-500" size={35} />
          </CardStats>
          <CardStats text="Total good answers" value={userData.totalGoodAnswer}>
            <MdTaskAlt className="text-success" size={35} />
          </CardStats>
          <CardStats text="Total mistakes" value={userData.totalMistakes}>
            <BiTaskX className="text-danger" size={35} />
          </CardStats>
          <CardStats text="Time passed" value={userData.timePassed + " sec"}>
            <BiTimer size={35} />
          </CardStats>
          <CardStats text="Level" value={userData.level} level>
            <BsSpeedometer2 size={35} />
          </CardStats>
          <CardStats text="Exp" value={userData.xp}>
            <RiCopperCoinLine size={35} />
          </CardStats>
        </div>
        {/* fill-in-the-black text */}
        <h1 className="text-xl text-white mb-2 text-center">Tense map</h1>
        <div className="flex">
          {/*
          <CardCoursesRefactor
            name="Present simple"
            type="Fill in text"
            to="/exercise1"
            xp="150"
            level="Easy"
          />
          */}
          <img
            src={tenseMap}
            alt="tense map"
            className="self-center"
            useMap="#tensemap"
          />
          <map name="#tensemap">
            <Link to="/">
              <area
                shape="rect"
                coords=""
                alt=""
                className="cursor-pointer bg-red-400"
              />
            </Link>
            <Link to="/">
              <area
                shape="rect"
                coords="34,44,270,350"
                alt=""
                className="cursor-pointer"
              />
            </Link>
            <Link to="/">
              <area shape="rect" coords="" alt="" className="cursor-pointer" />
            </Link>
            <Link to="/">
              <area shape="rect" coords="" alt="" className="cursor-pointer" />
            </Link>
          </map>
        </div>
      </div>
    </>
  );
}

export default Profile;
