import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-accent shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          {" "}
          🧑‍💻 DevTinder
        </Link>
      </div>
      <div className="flex gap-3 ">
        {user && (
          <p className="text-sm font-medium whitespace-nowrap">
            Welcome back, {user.firstName}
          </p>
        )}
        <div className="dropdown dropdown-end mx-5 flex">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user?.photoUrl?.trim()
                    ? user.photoUrl
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
