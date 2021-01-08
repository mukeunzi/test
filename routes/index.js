const express = require("express");
const router = express.Router();

const storeRouter = require("./stores");
const locationRouter = require("./location");

router.use("/stores", storeRouter);
router.use("/location", locationRouter);

module.exports = router;
