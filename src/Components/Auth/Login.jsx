import { useLoginPostMutation } from "../services/Auth.js";
import bgImage from "../Images/coolBackground.png";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import React, { useState } from "react";

toast.configure();
const Login = () => {
  const [loginPost, result] = useLoginPostMutation();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);

  const inputHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
     if(login.email === "admin11@chillcase.com" && login.password === "chillcasa11"){
            setLoading(false);
            setInput(false);
            localStorage.setItem("login", true);
            toast.info("Successfully logged In!", { theme: "dark" });
             setInterval(() => {
                 window.location.reload(true);
          }, 2500);

     }
     else if((login.email === " " || !login.email)  && (login.password === " " || !login.password)){
      setLoading(false);
      setInput(true);
      toast.warn("Fields are empty!", { theme: "dark" });
     }
     else{
          setLoading(false);
          setInput(true);
          toast.warn("Wrong Credentials", { theme: "dark" });
     }


    // const loginObj = {
    //   email: login.email,
    //   password: login.password,
    // };

    // await loginPost(loginObj)
    //   .unwrap()
    //   .then((res) => {
    //     if (res.user.role_id !== "5" && res.user.role_id !== undefined) {
    //       setLoading(false);
    //       setInput(false);
    //       localStorage.setItem("login", true);
    //       localStorage.setItem("user", JSON.stringify(res.user));
    //       toast.info("Successfully logged In!", { theme: "dark" });
    //       setInterval(() => {
    //         window.location.reload(true);
    //       }, 1500);
    //     } else {
    //       toast.warn(res.data.message, { theme: "dark" });
    //       setLoading(false);
    //       setInput(true);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.status === 401) {
    //       setLoading(false);
    //       setInput(true);
    //       toast.warn(err.data.message, { theme: "dark" });
    //     } else if (loginObj.phone === "" && loginObj.password === "") {
    //       toast.warn("Fields are empty", { theme: "dark" });
    //       setLoading(false);
    //       setInput(true);
    //     } else {
    //       setLoading(false);
    //       setInput(true);
    //       toast.warn("Wrong Credentials", { theme: "dark" });
    //     }
    //   });
  };
  function displayMessage() {
    toast.info("Kindly contact your service provider", { theme: "dark" });
  }

  return (
    <>
      <div
        className="hold-transition login-page"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        <div className="login-box">
          <div className="login-logo">
            <a href="#b" style={{ color: colorScheme.card_txt_color }}>
              <b>Chill</b>&nbsp;Casa
            </a>
          </div>
          {/* /.login-logo */}
          <div className="login-bg-inner">
            <div className="card login-card">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  <i class="fas fa-user fa-3x"></i>
                </div>
                <p
                  className="login-box-msg"
                  style={{ color: colorScheme.card_txt_color }}
                >
                  Sign in to start your session
                </p>
                <form onSubmit={userLogin}>
                  <label
                    htmlFor=""
                    className="form-label"
                    style={{ color: colorScheme.card_txt_color }}
                  >
                    Email
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className={
                        login.email === " " && input === true
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      name="email"
                      placeholder="Enter Email..."
                      onChange={inputHandler}
                      style={{
                        background: colorScheme.bg_color_transparent,
                        color: colorScheme.card_txt_color,
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor=""
                    className="form-label"
                    style={{ color: colorScheme.card_txt_color }}
                  >
                    Password
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className={
                        login.password === " " && input === true
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      name="password"
                      placeholder="Password..."
                      onChange={inputHandler}
                      style={{
                        background: colorScheme.bg_color_transparent,
                        color: colorScheme.card_txt_color,
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="icheck-info d-flex ">
                    <input type="checkbox" id="blankCheckbox" value="option1" />
                    &nbsp;&nbsp;
                    <label
                      htmlFor="remember"
                      style={{
                        color: colorScheme.card_txt_color,
                        fontWeight: colorScheme.fontWeight_One,
                        marginTop: "0.4em",
                      }}
                    >
                      Remember Me
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-outline-light btn-login btn-block mt-1"
                  >
                    {loading === true ? "Loading..." : "Sign In"}
                  </button>
                  {/* /.col */}
                </form>
                <div className="social-auth-links text-center mb-3">
                  <p style={{ color: colorScheme.card_txt_color }}>- OR -</p>
                  {/* <a href="#" className="btn btn-block btn-outline-primary">
            <i className="fab fa-facebook mr-2" /> Sign in using Facebook
          </a>
          <a href="#" className="btn btn-block btn-outline-danger">
            <i className="fab fa-google-plus mr-2" /> Sign in using Google+
          </a> */}
                </div>
                {/* /.social-auth-links */}
                {/* <p className="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p> */}
                <p className="text-center mb-0">
                  <a
                    onClick={() => {
                      displayMessage();
                    }}
                    style={{
                      color: colorScheme.card_txt_color,
                      cursor: "pointer",
                    }}
                  >
                    New on our platform?{" "}
                  </a>
                </p>
                {/* <span  className="text-info">Create an account</span> */}
              </div>
              {/* /.login-card-body */}
            </div>
          </div>
        </div>
        {/* /.login-box */}
      </div>
    </>
  );
};

export default Login;
