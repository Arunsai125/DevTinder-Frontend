import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;
  const dispatch = useDispatch();
  const dealUserCard = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="card bg-slate-800 w-96 shadow-sm h-[600px] flex flex-col">
      <figure className="h-[280px] bg-white flex items-center justify-center">
        <img
          src={user.photoUrl}
          alt="profile"
          className="object-cover h-full w-full"
        />
      </figure>

      <div className="card-body flex-1">
        <h2 className="card-title text-white">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm opacity-80">
          {user.age && `${user.age} years`} {user.gender && `• ${user.gender}`}
        </p>

        <p className="mt-2">{user.about}</p>
      </div>

      <div className="card-actions justify-center mb-6">
        <button
          className="btn bg-blue-500 text-white px-4"
          onClick={() => {
            dealUserCard("ignored", user._id);
          }}
        >
          Ignore
        </button>
        <button
          className="btn bg-pink-600 text-white px-4"
          onClick={() => {
            dealUserCard("interested", user._id);
          }}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
