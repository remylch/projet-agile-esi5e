import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

const sendToastLevelUp = (value) => {
  toast.info(`Congratulation, you are now at ${value} level, keep going !`);
};

const convertAndGetTime = (initialTime) => {
  const times = initialTime.toString().split(".");
  times[0] = times[0] * 60; // convert minutes to seconds
  const totalTime = times[0] + parseInt(times[1]);
  return parseInt(totalTime);
};

export { useHorizontalScroll, sendToastLevelUp, convertAndGetTime };
