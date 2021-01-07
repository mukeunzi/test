const express = require("express");
const router = express.Router();

const storeRouter = require("./stores");

router.use("/stores", storeRouter);

module.exports = router;
