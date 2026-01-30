import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const fetch = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view");
      useDispatch(addUser(res));
    } catch (err) {
      if (err.status === 401) {
        useNavigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
