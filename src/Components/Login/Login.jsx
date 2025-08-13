import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Login = ({ setLoginStatus, userData, setUserData }) => {
  const [page, setPage] = useState("login");

  const submitSignupData = (e) => {
    e.preventDefault();
    if (
      !(
        userData.email.includes("@") &&
        userData.username !== "" &&
        userData.password.length >= 4
      )
    ) {
      alert("Details Missing");
      return;
    }
    axios
      .post("http://localhost:8080/signup", userData)
      .then((res) => {
        setLoginStatus(true);
        localStorage.setItem(
          "username",
          res.data.username || userData.username
        );
        localStorage.setItem("email", res.data.email || userData.email);
        localStorage.setItem(
          "password",
          res.data.password || userData.password
        );
        localStorage.setItem("isLoggedIn", "true");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignupDataChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUserDataChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitLoginData = (e) => {
    e.preventDefault();
    if (userData.username !== "" && userData.password !== "") {
      axios
        .post("http://localhost:8080/login", userData)
        .then((res) => {
          setLoginStatus(true);
          setUserData((prev) => {
            return { ...prev, email: res.data.email };
          });
          localStorage.setItem(
            "username",
            res.data.username || userData.username
          );
          localStorage.setItem("email", res.data.email || userData.email);
          localStorage.setItem(
            "password",
            res.data.password || userData.password
          );

          localStorage.setItem("isLoggedIn", true);
          console.log("wegot ", res);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Check the data Again");
    }
  };

  const signUpPage = () => {
    return (
      <div className="signup-window">
        <div className="left-signup">
          <p>Sign Up</p>
          <form onSubmit={submitSignupData}>
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleSignupDataChange}
            />

            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleSignupDataChange}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleSignupDataChange}
            />

            <input type="checkbox" name="agreement" id="agreement" />
            <label htmlFor="agreement" id="agreement-label">
              I AGREE TO THE <span>TERMS OF SERVICES</span> AND{" "}
              <span>PRIVACY POLICY</span>
            </label>
            <br />

            <button type="submit" id="left-btn-signup">
              Sign Up
            </button>
            <button
              type="button"
              className="left-btn-login"
              onClick={() => setPage("login")}
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    );
  };

  const loginPage = () => {
    return (
      <div className="login-window">
        <div className="right-login">
          <p>Login</p>
          <form onSubmit={submitLoginData}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleUserDataChange}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleUserDataChange}
            />

            <button type="submit" className="right-btn-login">
              LOGIN
            </button>
            <button
              className="right-btn-signup"
              onClick={() => setPage("signup")}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="login-signup-window">
      {page === "login" ? loginPage() : signUpPage()}
    </div>
  );
};

export default Login;
