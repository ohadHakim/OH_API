var express = require("express");
var router = express.Router();
const cm = require("../controllers/customers");

/* POST new customer */
router.post("/add", cm.addCustomer);
router.get("/:id", cm.getCustomer);

module.exports = router;
