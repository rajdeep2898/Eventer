const User = require("../models/user");
// const Order = require("../models/order");
const Event = require("../models/event");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
// const category = require("../models/category");

exports.getEventById = (req, res, next, id) => {
  Event.findById(id)
    // .populate("category")
    .exec((err, event) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found in DB",
        });
      }
      req.event = event;
      next();
    });
};
exports.createEvent = (req, res) => {
  console.log("test");
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }
    fields.user = req.profile;
    let product = new Event(fields);

    //Handel Files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving Pizza in DB Failed",
        });
      }
      res.json(product);
    });
    // }
  });
};

exports.getEvent = (req, res) => {
  req.event.photo = undefined;
  return res.json(req.event);
};

//MiddleWare
exports.photo = (req, res, next) => {
  // console.log(req.event.photo.data);
  // console.log("as");

  if (req.event.photo.data) {
    res.set("Content-Type", req.event.photo.contentType);
    return res.send(req.event.photo.data);
  }
  next();
};

//Delete
exports.deleteEvent = (req, res) => {
  let product = req.event;
  product.remove((err, deletedProduct) => {
    if (err) {
      res.status(400).json({
        error: "Failed to delete the event",
      });
    }
    res.json({
      message: "Deletion was Successful",
      deletedProduct,
    });
  });
};

// //Update
// exports.updateProduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image",
//       });
//     }

//     let product = req.product;
//     product = _.extend(product, fields);

//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size too big!",
//         });
//       }
//       product.photo.data = fs.readFileSync(file.photo.path);
//       product.photo.contentType = file.photo.type;
//     }
//     product.save((err, product) => {
//       if (err) {
//         res.status(400).json({
//           error: "Updation of product failed",
//         });
//       }
//       res.json(product);
//     });
//   });
// };

exports.getAllEvents = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Event.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO event found",
        });
      }
      res.json(products);
    });
};

exports.getEventsListById = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Event.find({ user: req.profile._id })
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO event found",
        });
      }
      res.json(products);
    });
};

// exports.updateStock = (req, res, next) => {
//   let myOperations = req.body.order.products.map((prod) => {
//     return {
//       updateOne: {
//         filter: { _id: prod._id },
//         update: { $inc: { stock: prod.count, sold: +prod.count } },
//       },
//     };
//   });
//   Product.bulkWrite(myOperations, {}, (err, products) => {
//     if (err) {
//       res.status(400).json({
//         error: "Bulk operation failed.",
//       });
//     }
//     next();
//   });
// };
// exports.getAllUniqueCategories = (req, res) => {
//   Product.distinct("category", {}, (err, categories) => {
//     if (err) {
//       res.status(400).json({
//         error: "No category found.",
//       });
//     }
//     res.json(category);
//   });
// };
