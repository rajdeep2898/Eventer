// import { API } from "../../backend";

//Category Calls
// export const createCategory = (userId, token, category) => {
//   return fetch(`/api/event/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(category),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// //Get all Categories
// export const getCategories = () => {
//   return fetch(`/api/events`, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// //get a Category
// export const getCategory = (categoryId) => {
//   return fetch(`/api/event/${categoryId}`, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// //Update a Category
// export const updateCategory = (categoryId, userId, token, category) => {
//   console.log(JSON.stringify(category.name));
//   console.log(categoryId);
//   console.log(userId);

//   return fetch(`${API}/category/${categoryId}/${userId}`, {
//     // console.log(category);

//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(category),
//     // body: category,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// //get all categories
// export const getCategories = () => {
//   return  fetch(`/api/categories`, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };
//Products Calls

export const createaProduct = (userId, token, product) => {
  return fetch(`/api/event/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// export const createaProduct = (userId, token, product) => {
//   return  fetch(`/api/product/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: product,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

//Get all Products
// export const getProducts = () => {
//   return  fetch(`/api/products`, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };
export const getProducts = (userid) => {
  return fetch(`/api/events/${userid}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete a Profuct
export const deleteProduct = (productId, userId, token) => {
  return fetch(`/api/event/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a Product
export const getProduct = (productId) => {
  return fetch(`/api/event/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update a Product
// export const updateProduct = (productId, userId, token, product) => {
//   return  fetch(`/api/product/${productId}/${userId}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: product,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };
// export const updateProduct = (productId, userId, token, product) => {
//   return fetch(`/api/product/${productId}/${userId}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: product,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// --------------------Orders------------
//All orders
// export const getOrders = (userId, token) => {
//   return fetch(`/api/order/all/${userId}`, {
//     method: "GET",
//     headers: {
//       // Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };
