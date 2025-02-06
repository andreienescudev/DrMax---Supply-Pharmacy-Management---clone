import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "./constants";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    let error = "";

    if (email === "") {
      error = error + "Email, ";
    }

    if (password === "") {
      error = error + "Password ";
    }

    if (error.length > 0) {
      error = error + " can not be blank";
      alert(error);
      return;
    }

    const data = {
      Email: email,
      Password: password,
    };

    const url = `${baseUrl}/api/Users/login`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          if (email === "admin@drmax.com" && password === "admin") {
            localStorage.setItem("username", email);
            window.location.href = "/admindashboard";
          } else {
            localStorage.setItem("username", email);
            window.location.href = "/dashboard";
          }
        } else {
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPasswordStrength = () => {
    if (!password) {
      return 0;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]+/.test(password);

    if (hasLetter && hasNumber && hasSpecialChar) {
      return 100;
    } else if (hasLetter && hasNumber) {
      return 66.6;
    } else {
      return 33.3;
    }
  };

  const getProgressColor = () => {
    const passwordStrength = getPasswordStrength();

    if (passwordStrength === 100) {
      return "green";
    } else if (passwordStrength === 66.6) {
      return "orange";
    } else {
      return "red";
    }
  };

  const getPasswordMessage = () => {
    const passwordStrength = getPasswordStrength();

    if (passwordStrength === 100) {
      return "Parola e foarte bună";
    } else if (passwordStrength === 66.6) {
      return "Parola e bună";
    } else {
      return "Parola e slabă";
    }
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "#f3f4f6",
          width: "80%",
          margin: "5% auto",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "#333" }}>
            DrMax Supply Pharmacy System <br />- Login -
          </h3>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <img
              style={{ width: "100%", borderRadius: "10px" }}
              src="../LoginBanner.jpg"
              alt="Banner"
            />
          </div>

          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Enter Email"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    style={{
                      width: "100%",
                      padding: "10px",
                      paddingRight: "40px",
                      marginBottom: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    borderRadius: "4px",
                    marginTop: "10px",
                    backgroundColor: "lightgray",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${getPasswordStrength()}%`,
                      height: "100%",
                      borderRadius: "4px",
                      backgroundColor: getProgressColor(),
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {getPasswordMessage()}
                  </span>
                  {/* <a href="#!">Forgot password?</a> */}
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "15px",
                    margin: "10px 0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Sign in
                </button>
              </form>

              <Link to="/Registration">
                <button
                  type="button"
                  style={{
                    width: "100%",
                    backgroundColor: "#008CBA",
                    color: "white",
                    padding: "15px",
                    margin: "10px 0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Registration
                </button>
              </Link>

              <button
                type="button"
                style={{
                  width: "100%",
                  backgroundColor: "#3b5998",
                  color: "white",
                  padding: "15px",
                  margin: "10px 0",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  alert("Facebook e pentru postări, nu pentru a cumpăra medicamente.")
                }
              >
                Continue with Facebook
              </button>

              <button
                type="button"
                style={{
                  width: "100%",
                  backgroundColor: "#55acee",
                  color: "white",
                  padding: "15px",
                  margin: "10px 0",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  alert("Twitter e pentru postări, nu pentru a cumpăra medicamente.")
                }
              >
                Continue with Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
