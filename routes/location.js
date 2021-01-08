const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils");
const LocationController = require("../controllers/location");

router.get("/", asyncWrapper(LocationController.searchLatLngByPostcode));

module.exports = router;
