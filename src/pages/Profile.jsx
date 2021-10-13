import React from "react";
import CardStats from "../components/Cards/CardStats";
import { MdTaskAlt } from "react-icons/md";
import { BiTaskX, BiTimer } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import CardCourses from "../components/Cards/CardCourses";
import { useHorizontalScroll } from "../utils/utils";
import ModalExercice from "../components/ModalExercice";
import { useSelector } from "react-redux";
import { isOpenModalExercice } from "../store/appSlice";

function Profile() {
  const scrollRef = useHorizontalScroll();

  const isOpenExercice = useSelector(isOpenModalExercice);
  console.log(isOpenExercice);

  //fetch time passed

  //fetch exercices done

  //fetch level

  return (
    <>
      {isOpenExercice ? <ModalExercice open={isOpenExercice} /> : null}
      <div className="flex-1 flex-col flex pl-20 pr-20 pt-10 pb-10 bg-secondary">
        {/* stats */}
        <h1 className="text-xl text-white mb-5">My stats</h1>
        <div className="flex w-full h-1/3 items-center gap-5 flex-wrap mb-5">
          <CardStats text="Exercices completed" value="4">
            <AiOutlineFileDone className="text-blue-500" size={35} />
          </CardStats>
          <CardStats text="Total good answers" value="55">
            <MdTaskAlt className="text-success" size={35} />
          </CardStats>
          <CardStats text="Total mistakes" value="10">
            <BiTaskX className="text-danger" size={35} />
          </CardStats>
          <CardStats text="Time passed" value="5h">
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
