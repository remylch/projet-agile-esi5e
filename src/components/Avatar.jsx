import { FaUserCircle } from "react-icons/fa";

/**
 * @description Avatar component take of the profile Pic in props else an icon is automaticaly provided
 * @param {*} url
 */
function Avatar({ url }) {
  return (
    <>
      {url !== null ? (
        <img
          data-testid="avatar"
          loading="lazy"
          src={url}
          id="img-avatar"
          alt="profile pic"
          className="h-10 rounded-full cursor-pointer transition duration-75 transform hover:scale-110"
        />
      ) : (
        <FaUserCircle
          size={30}
          className="text-primary"
          data-testid="userIcon"
        />
      )}
    </>
  );
}

export default Avatar;
