var express = require("express");
var router = express.Router();
const cm = require("../controllers/customers");
const mwAuth = require("../middleware/auth");
const auth = require("../controllers/auth");

/* POST new customer */
router.post("/add", cm.addCustomer);
/*GET customer by id*/
router.get("/:id", mwAuth, cm.getCustomer);

module.exports = router;
