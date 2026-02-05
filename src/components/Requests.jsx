import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

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

  const manageRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
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
          const user = request.fromUserId;
          const {
            _id: userId,
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
          } = user;

          const requestId = request._id;
          if (!user) return null;
          return (
            <div key={requestId} className="card w-80 bg-base-100 shadow-xl">
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
                <button
                  className="btn btn-outline btn-error btn-md w-28 md:w-32"
                  onClick={() => {
                    manageRequest("rejected", requestId);
                  }}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary btn-md w-28 md:w-32"
                  onClick={() => {
                    manageRequest("accepted", requestId);
                  }}
                >
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
