import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, photoUrl, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="pb-40 flex justify-center">
      <div className="flex items-stretch gap-16">
        <div className="card bg-red-400 w-96 shadow-sm m-16">
          <div className="card-body">
            <h1 className="card-title py-4 text-black font-extrabold text-center">
              My Profile
            </h1>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  First Name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-slate-800 text-white w-full p-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-slate-800 text-white w-full p-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black font-semibold">Age</span>
              </label>
              <input
                type="number"
                min="18"
                className="input input-bordered bg-slate-800 text-white w-full p-2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  About
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-slate-800 text-white w-full p-2"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Gender
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-slate-800 text-white w-full p-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-slate-800 text-white w-full p-2"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div className="card-actions mt-6 justify-center">
              <button
                className="btn bg-black text-white px-6"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
