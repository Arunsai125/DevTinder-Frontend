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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.patch(
      `${BASE_URL}/profile/edit`,
      { firstName, lastName, age, about, gender, photoUrl },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
    navigate("/feed");
  };

  return (
    <div className="pb-40 flex justify-center min-h-screen pt-[50px]">
      <div className="flex gap-16 items-stretch">
        {/* LEFT CARD */}
        <div className="card bg-red-400 w-96 shadow-sm h-[600px] flex flex-col">
          <div className="card-body flex-1">
            <h1 className="card-title py-4 text-black font-extrabold text-center">
              My Profile
            </h1>

            {[
              ["First Name", firstName, setFirstName],
              ["Last Name", lastName, setLastName],
              ["Age", age, setAge, "number"],
              ["About", about, setAbout],
              ["Gender", gender, setGender],
              ["Photo URL", photoUrl, setPhotoUrl],
            ].map(([label, value, setter, type = "text"]) => (
              <div key={label} className="form-control w-full">
                <label className="label">
                  <span className="label-text text-black font-semibold">
                    {label}
                  </span>
                </label>
                <input
                  type={type}
                  className="input input-bordered bg-slate-800 text-white w-full p-2"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            ))}
          </div>
          {error && (
            <p className="text-red-700 text-sm text-center mt-3">{error}</p>
          )}
          <div className="card-actions justify-center mb-6">
            <button
              className="btn bg-black text-white px-6"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
