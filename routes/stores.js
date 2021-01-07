const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils");
const StoreController = require("../controllers/stores");

router.get("/", asyncWrapper(StoreController.getStoreListAll));

module.exports = router;
