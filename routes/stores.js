const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils");
const StoreController = require("../controllers/stores");

router.get("/", asyncWrapper(StoreController.getStoreListAll));
router.get("/nearest", asyncWrapper(StoreController.searchNearestStoreByPostcode));
router.get("/:name", asyncWrapper(StoreController.getStore));

module.exports = router;
