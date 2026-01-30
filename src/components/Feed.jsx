import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

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
    <div>
      {/* For now we show the first user */}
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
