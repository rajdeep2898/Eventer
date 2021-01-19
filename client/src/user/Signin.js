import React, { useState } from "react";
import Base from "../core/Base";
import "../styles.css";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loding: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      console.log(user.role);
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <lable className="text-light">Email</lable>
              <input
                type="email"
                onChange={handleChange("email")}
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-group">
              <lable className="text-light">Password</lable>
              <input
                type="password"
                onChange={handleChange("password")}
                className="form-control"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const lodingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h3>Loading ...</h3>
        </div>
      )
    );
  };
  return (
    <div>
      <Base title="sign in Page" description="Page to signin">
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            {errorMessage()}
            {lodingMessage()}
          </div>
        </div>
        {signInForm()}
        {performRedirect()}
        {/* <p className="text-white text-center">
          Admin- Email-a1@gmail.com Pass-123456
        </p> */}
        <p className="text-white text-center">
          User- Email-a2@gmail.com Pass-123456
        </p>
      </Base>
    </div>
  );
};
export default Signin;
