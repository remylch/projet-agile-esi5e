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
          <img
            src={tenseMap}
            alt="tense map"
            className="self-center"
            usemap="#tensemap"
          />
          <map name="tensemap">
            {/* topside */}
            <area
              className="cursor-pointer"
              alt="present+be+ing"
              title="present+be+ing"
              href=""
              coords="310,255,60,0"
              shape="circle"
            />
            <area
              className="cursor-pointer"
              alt="present+mod"
              title="present+mod"
              href=""
              coords="470,255,50,50"
              shape="circle"
            />
            <area
              className="cursor-pointer"
              alt="present+have+en"
              title="present+have+en"
              href=""
              coords="618,255,70,70"
              shape="circle"
            />
            <area
              className="cursor-pointer"
              alt="present+be+ing"
              title="present+be+ing"
              href=""
              coords="911,255,70,70"
              shape="circle"
            />
            {/* botside */}
            <area
              className="cursor-pointer"
              alt="past+did+ed"
              title="past+did+ed"
              href=""
              coords="310,480,70,70"
              shape="circle"
            />
            <area
              className="cursor-pointer"
              alt="past+mod+ed"
              title="past+mod+ed"
              href=""
              coords="480,480,70,70"
              shape="circle"
            />
            <area
              className="cursor-pointer"
              alt="past+had+en"
              title="past+had+en"
              href=""
              coords="615,480,70,70"
              shape="circle"
            />
            <area
              className="cursor-pointer"
              alt="past+waswere+ing"
              title="past+waswere+ing"
              href=""
              coords="880,480,100,100"
              shape="circle"
            />
          </map>
        </div>
      </div>
    </>
  );
}

export default Profile;
