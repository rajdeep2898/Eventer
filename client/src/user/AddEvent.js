import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    // getCategories().then((data) => {
    //   console.log("DATA", data);
    //   if (data.error) {
    //     setValues({ ...values, error: data.error });
    //   } else {
    //     console.log(categories);
    //   }
    // });
    setValues({ ...values, formData: new FormData() });
  };
  useEffect(() => {
    preload();
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-dark mb-3" to="/user/dashboard">
          Home
        </Link>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then((data) => {
      console.log(data.name);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          //   stock: "",
          loading: false,
          createdProduct: data.name,
        });
        setTimeout(() => {
          setValues({
            ...values,
            getRedirect: true,
          });
        }, 2000);
      }
    });
  };
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Event
      </button>
    </form>
  );

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

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} created successfully.
      </div>
    );
  };
  const lodingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h3>Loding..</h3>
        </div>
      )
    );
  };

  const performRedirect = () => {
    if (getRedirect) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <Base
      title="Create Event"
      description="Add a new Event"
      className="container bg-info p-4"
    >
      {goBack()}
      <div className="row">
        <div className="col-md-12  text-left">
          {lodingMessage()}
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{createProductForm()}</div>
      </div>
      {performRedirect()}
    </Base>
  );
};
export default AddProduct;
