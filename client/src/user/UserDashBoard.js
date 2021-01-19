import React, { useState, useEffect } from "react";
import $ from "jquery";
import Base from "../core/Base";
import "../styles.css";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import EditChart from "../edit-chart/edit-chart";
import { getProducts } from "./helper/adminapicall";
import Card from "./Card";

const UserDashBoard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  // const [productsInCart, setProductsInCart] = useState([]);
  // const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const loadAllProduct = () => {
    getProducts(_id).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
    // setProductsInCart(loadCart());
  }, [reload]);

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/create/event" className="nav-link text-success">
              Create events
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const userRightSide = () => {
    return (
      <div>
        <div className="card mb-4">
          <h4 className="class-header">Events</h4>
          <div id="middle" className="text-center">
            {/* <h1 className="">Events</h1> */}
            <div className="row">
              {products.map((product, index) => {
                return (
                  <div key={index} className="col-5 mx-2 my-2 ">
                    <Card
                      product={product}
                      setReload={setReload}
                      reload={reload}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Welcome User"
      description="Manage your Events here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{userLeftSide()}</div>
        <div className="col-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
