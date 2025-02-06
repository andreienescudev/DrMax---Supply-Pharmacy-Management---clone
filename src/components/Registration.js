import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "./constants";
import axios from "axios";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = (e) => {
    let error = "";
    if (firstName === "") error = error + "FirstName ,";
    if (lastname === "") error = error + "Lastname ,";
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (email === "") {
      error = error + "Email ,";
    } else if (!emailRegex.test(email)) { // validarea formatului adresei de email
      error = error + "Invalid Email Format,";
    }
    
    if (password === "") error = error + "Password ,";
  
    if (error.length > 0) {
      error = error.substring(0, error.length - 1) + " cannot be blank";
      alert(error);
      return;
    }
  
    e.preventDefault();
    const url = `${baseUrl}/api/Users/registration`;
    const data = {
      FirstName: firstName,
      LastName: lastname,
      Email: email,
      Password: password,
    };
  
    axios
      .post(url, data)
      .then((result) => {
        clear();
        const dt = result.data;
        alert(dt.statusMessage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const clear = () => {
    setFirstName("");
    setEmail("");
    setLastname("");
    setPassword("");
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
     return "Parola e foarte bună" 
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
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <div className="mt-4" style={{ margin: "0 auto", width: "430px" }}>
          <h3>DrMax Registration</h3>
        </div>
        <section
          className="vh-100"
          style={{ backgroundColor: "#eee", padding: "7px" }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                placeholder="Enter First Name"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                onChange={(e) => setLastname(e.target.value)}
                                value={lastname}
                                placeholder="Enter Last Name"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter Email"
                              />
                            </div>
                          </div>

                          <div
                            className="d-flex flex-row align-items-center mb-4"
                            style={{ position: "relative" }}
                          >
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="form3Example4c"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Enter Password"
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
                                onClick={() =>
                                  setShowPassword(!showPassword)
                                }
                              >
                                {showPassword ? "Hide" : "Show"}
                              </button>
                            </div>
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

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={(e) => handleSave(e)}
                            >
                              Register
                            </button>
                            &nbsp;
                            <Link
                              to="/"
                              className="btn btn-info btn-lg btn-block"
                            >
                              Login
                            </Link>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="../LoginBanner.jpg"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
