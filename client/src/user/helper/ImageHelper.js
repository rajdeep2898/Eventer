import React from "react";
// import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `api/event/photo/${product._id}`
    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};
export default ImageHelper;
