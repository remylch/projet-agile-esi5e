import React from "react";
import { useDispatch } from "react-redux";
import { setIsOpenModalExercice } from "../store/appSlice";

function ModalExercice({ exercice, open }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    //TODO: setTimerMin and setTimerSec with exercice.duration value
    return;
  }, []);

  //------ timer -----
  // The state for our timer
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
    dispatch(setIsOpenModalExercice());
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
              <button className="btn-inline" onClick={closeModal}>
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