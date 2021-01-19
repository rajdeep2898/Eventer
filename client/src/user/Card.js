import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
// import { isAuthenticated } from "../../../controllers/auth";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct } from "./helper/adminapicall";

// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = true,
  setReload = function (f) {
    return f;
  },
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const { user, token } = isAuthenticated();

  const cartTitle = product ? product.name : "Default Pizza Photo";
  const cartDescription = product ? product.description : "Very Tasty PIZZA";
  const cartPrice = product ? product.price : "150";
  // console.log(cartPrice);
  //   console.log(product.name);

  //   const addtoCart = () => {
  //     // addItemToCart(product, () => setRedirect(false));
  //     addItemToCart(product, () => {});
  //   };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={() => {
            // addtoCart();
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            deleteProduct(product._id, user._id, token);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove Event
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      {getARedirect(redirect)}
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {cartPrice}</p>
        <div className="row">
          {/* <div className="col-12">{showAddToCart(addToCart)}</div> */}
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
