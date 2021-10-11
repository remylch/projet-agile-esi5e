import { FaUserCircle } from "react-icons/fa";

function Avatar({ url }) {
  return (
    <>
      {url !== null ? (
        <img
          loading="lazy"
          src={url}
          alt="profile pic"
          className="h-10 rounded-full cursor-pointer transition duration-75 transform hover:scale-110"
        />
      ) : (
        <FaUserCircle size={30} className="text-primary" />
      )}
    </>
  );
}

export default Avatar;
