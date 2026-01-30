import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      const feedData = res.data?.data?.userFeedData ?? [];
      dispatch(addFeed(feedData));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">No feed available</p>;
  }
  return (
    <div className="card bg-red-500 w-96 shadow-sm mx-auto my-10">
      <figure>
        <img src={feed[0].photoUrl} alt="User DP" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary bg-blue-500 p-2">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
