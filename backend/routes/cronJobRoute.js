const express = require("express");
const router = express.Router();
const { etaFunction } = require("../controllers/cronJobController");

router.post("/etaFunction", etaFunction);

module.exports = {
  routes: router,
};
