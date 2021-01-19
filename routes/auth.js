const express = require("express");
const router = express.Router();
const { signout, signup, signin } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
router.post(
  "/signup",
  [
    check("name", "name must be at least 5 chars long").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({
      min: 1,
    }),
  ],
  signin
);
router.get("/signout", signout);

module.exports = router;
