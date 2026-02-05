import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "SOMETHING WENT WRONG");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      setIsLoginForm(true);
      setError("Signup successful. Please login.");
    } catch (err) {
      setError(err?.response?.data || "SOMETHING WENT WRONG");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-red-400 w-96 shadow-sm m-24">
        <div className="card-body items-center text-center">
          <h1 className="card-title py-4 text-black font-extrabold">
            DevTinder - Portal
          </h1>

          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full my-1 px-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full my-1 px-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <label className="input validator my-1 w-full">
            <input
              type="email"
              placeholder="mail@devtinder.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </label>

          <label className="input validator my-1 w-full">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
          </label>

          <p className="text-black text-sm">{error}</p>

          <div className="card-actions mt-2">
            <button
              className="btn btn-primary px-6 bg-black"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>

          <p
            className="cursor-pointer text-sm mt-3 text-black"
            onClick={() => setIsLoginForm((v) => !v)}
          >
            {isLoginForm
              ? "New user? Signup here"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
