import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { loginEmployee } from "../../services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authSlice/authSlice";
import { setUser } from "../../Redux/authSlice/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const navigate = useNavigate(); // To redirect after login
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setErrEmail("Enter your email");
      return;
    }
  
    if (!password) {
      setErrPassword("Enter your password");
      return;
    }
  
    try {
      // Ensure that loginEmployee function correctly returns token and user
      const response = await loginEmployee(email, password);
      
      if (response && response.token && response.user) {
        const { token, user } = response;
        dispatch(loginSuccess({ token, user }));
        dispatch(setUser(user));
        localStorage.setItem("authToken", token);
        
        navigate("/");
      } else {
        toast.error("Invalid response structure");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrEmail("Invalid credentials");
        setErrPassword("Invalid credentials");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with OREBI
              </span>
              <br />
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all OREBI services
              </span>
              <br />
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © OREBI
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center">
            <h1 className="text-3xl font-semibold mb-4">Sign in</h1>

            <div className="flex flex-col gap-3">
              <input
                onChange={handleEmail}
                value={email}
                type="email"
                placeholder="Work Email"
                className="border p-2 rounded"
              />
              {errEmail && <p className="text-red-500">{errEmail}</p>}

              <input
                onChange={handlePassword}
                value={password}
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
              />
              {errPassword && <p className="text-red-500">{errPassword}</p>}

              <button
                onClick={handleSignIn}
                className="bg-primeColor text-white p-2 rounded"
              >
                Sign In
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
