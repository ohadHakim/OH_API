var express = require("express");
var router = express.Router();
const mwAuth = require("../middleware/auth");
const auth = require("../controllers/auth");

/* authentication */
router.post("/login", auth.login);

/* GET home page. */
router.get("/", mwAuth, function (req, res, next) {
  res.send("this is the Home page");
});

module.exports = router;
