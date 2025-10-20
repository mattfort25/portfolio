// server/routes/subscriberRoutes.js
const express = require("express");
const { subscribeEmail } = require("../controllers/subscriberController");
const router = express.Router();

router.post("/subscribe", subscribeEmail);

module.exports = router;
