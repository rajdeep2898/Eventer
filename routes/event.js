const express = require("express");
const router = express.Router();

const {
  getEventById,
  createEvent,
  getEvent,
  photo,
  deleteEvent,
  getAllEvents,
  getEventsListById,
} = require("../controllers/event");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("eventId", getEventById);

//Routes
router.post("/event/create/:userId", isSignedIn, isAuthenticated, createEvent);

router.get("/event/:eventId", getEvent);
router.get("/event/photo/:eventId", photo);

//Delete
router.delete(
  "/event/:eventId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteEvent
);

//Listing
router.get("/events", getAllEvents);
router.get("/events/:userId", getEventsListById);

module.exports = router;
