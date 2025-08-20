import React, { useState } from "react";
import "./Login.css";
import Toast from "../Toast/Toast"
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setLoginStatus, userData, setUserData }) => {
  
  
  const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;






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
      .post(`${mapify_backend_url}/signup`, userData)
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
        // console.log(res);
        toast.success("Loggin in")
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status == 406){
          toast.error("Username Already Exist")
        }
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
        .post(`${mapify_backend_url}/login`, userData)
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
          // console.log("wegot ", res);
        })
        .catch((error) => {
          console.log(error)
          toast.error("Check Username or Password")
        });
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
              value={userData.email}
              onChange={handleSignupDataChange}
            />

            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="username"
              id="username"
              value={userData.username}
              onChange={handleSignupDataChange}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
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
              onClick={() => {
                setPage("login")
                setUserData((prev)=>({...prev , password : ""}))
                console.log(userData)
              }}
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
              value={userData.username}
              onChange={handleUserDataChange}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleUserDataChange}
            />

            <button type="submit" className="right-btn-login">
              LOGIN
            </button>
            <button
              className="right-btn-signup"
              onClick={
                () => {setPage("signup")
                setUserData((prev)=>({...prev , password : ""}))
              }}
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
      <Toast/>
    </div>
  );
};

export default Login;
