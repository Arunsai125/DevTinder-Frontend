import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const totalConnections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!totalConnections || totalConnections.length === 0) {
      fetchConnections();
    }
  }, []);

  if (!totalConnections || totalConnections.length === 0) {
    return <h1 className="text-center py-10 text-xl">No Connections Found</h1>;
  }

  return (
    <div className="py-10">
      <h1 className="text-center text-2xl font-semibold mb-8">Connections</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {totalConnections.map((connection) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            connection;

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

                <div className="card-actions mt-4">
                  <button className="btn btn-primary btn-sm">Message</button>
                  <button className="btn btn-outline btn-sm">Remove</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
