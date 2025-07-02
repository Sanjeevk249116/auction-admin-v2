import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useRef } from "react";
import { loginUser } from "../../redux/action/auth";
import { useMediaQuery } from "react-responsive";

function LoginPage() {
  const dispatch = useDispatch();
  const email_ref = useRef();
  const isDastop = useMediaQuery({ query: "(min-width: 1000px)" });
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const loginWithEmail = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    email_ref.current.focus();
  }, []);

  return (
    <div className="auth-from valign-wrapper justify-center">
      <div className="">
        <div className="flex justify-center ">
          <img
            src="/images/auction-image.png"
            alt="logo"
            className="auction-logo"
          />
        </div>

        <h4 className="margin-0px text-center">Sign In To Auction Admin Dashboard</h4>
        <div className="purple lighten-5 cercle-purple-text p-1 flex mt-1">
          <i className="material-symbols-outlined">info</i>

          <p className="ml-1">
            This is a private access only. This dashboard is only for{" "}
            <b>Authorized Accounts</b>. Avoid trying to login if you do not have
            the necessary permissions
          </p>
        </div>

        <div className="mt-1">
          <form className="mt-1 " onSubmit={loginWithEmail}>
            <div className="input-field-style">
              <span className="material-symbols-outlined primary">person</span>
              <input
                ref={email_ref}
                className="browser-default "
                placeholder="Enter your email ID"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field-style">
              <span className="material-symbols-outlined primary ">lock</span>
              <input
                className="browser-default input-field "
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                style={{ width: "25px" }}
              >
                {showPassword ? (
                  <AiFillEye className="eye-icon" />
                ) : (
                  <AiFillEyeInvisible className="eye-icon" />
                )}
              </div>
            </div>

            <div className="submit-btn mv-2 column flex align-center ">
              <button
                className="btn full-width mb-1 mt-1 "
                type="submit"
                disabled={!email || !password || loading}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <img className="wave" src="/images/wave.png" alt="login-img"></img>
      <div className={`${isDastop&& "img-login"}`} >
			<img src="/images/login-image.svg" alt="image1"/>
		</div>
    </div>
  );
}

export default LoginPage;
