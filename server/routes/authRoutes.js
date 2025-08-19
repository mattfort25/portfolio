const expres = require("express");
const router = expres.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);

module.exports = router;
