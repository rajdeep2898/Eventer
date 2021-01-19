const User = require("../models/user");
// const { Order } = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User was found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).jason({
          error: "You are not Authorized to Update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      res.json(user);
    }
  );
};
exports.pushRelationship = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { children: req.body.childrenId } },
    (err, child) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update user",
        });
      }
      res.json(child);
    }
  );
};
exports.getTable = (req, res) => {
  // var id = req.profile._id;
  var id = req.body.childid;

  // console.log(typeof id);
  var c = 0;

  var root2 = {};
  var getDescendants = function (id, root) {
    return new Promise((resolve, reject) => {
      User.find({ children: id }).exec((err, children1) => {
        children1.forEach(function (child) {
          root[child._id] = { name: child.name };
          console.log("function 1");
          getDescendants(child._id.toString(), root[child._id]);
          root2 = root;
        });
      });
      resolve();
    });
  };
  var root = {};
  getDescendants(id, root).then(console.log("function 2"));
  // async function foo() {
  //   await getDescendants(id, root);
  //   console.log("function 2");
  // }
  // foo();

  res.json(root);
};
