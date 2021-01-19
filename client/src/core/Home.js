import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Eventer</h1>
              <p className="lead">
                {" "}
                Create your own personal Events and edit them.
              </p>
              <hr />
              <Link to="/signup" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/signin" className="btn btn-lg btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
