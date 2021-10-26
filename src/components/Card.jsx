import { FaFemale, FaMale } from "react-icons/fa";

/**
 * @description Component that represent a person of the team
 * @param {*} firstName, lastName, gender, role
 */
function Card({ firstName, lastName, gender, role }) {
  return (
    <div className="flex h-32 w-56 rounded-xl bg-secondary pr-1">
      <div className="flex items-center justify-center text-white w-1/3 rounded-r-lg border-r-2">
        {gender === "homme" ? (
          <FaMale size={50} />
        ) : gender === "femme" ? (
          <FaFemale size={50} />
        ) : null}
      </div>
      <div className="w-2/3 flex flex-col items-center justify-center text-white">
        <h3>{firstName + " " + lastName}</h3>
        <h4>{role}</h4>
      </div>
    </div>
  );
}

export default Card;
