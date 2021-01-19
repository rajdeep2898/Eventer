import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark twxt-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jubotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-outline-info text-white mt-5 p-4 text-center">
        <a
          className="text-white p-2"
          href="https://www.linkedin.com/in/rajdeep-datta-18716b16b/"
          target="_blank"
        >
          <i className="fab fa-linkedin fa-lg" /> Made by Rajdeep{" "}
        </a>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};
export default Base;
