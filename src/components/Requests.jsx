import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const totalRequests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data?.connectionsRecieved || []));
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!totalRequests || totalRequests.length === 0) {
    return <h1 className="text-center py-10 text-xl">No Requests Found</h1>;
  }

  return (
    <div className="py-10">
      <h1 className="text-center text-2xl font-semibold mb-8">
        Requests Recieved
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {totalRequests.map((request) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;

          return (
            <div key={_id} className="card w-80 bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-500">
                  {age && `${age} yrs`} {gender && `· ${gender}`}
                </p>

                <p className="text-sm mt-2">{about}</p>
              </div>
              <div className="card-actions justify-center gap-3 pb-6 px-4">
                <button className="btn btn-outline btn-error btn-md w-28 md:w-32">
                  Reject
                </button>
                <button className="btn btn-primary btn-md w-28 md:w-32">
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
