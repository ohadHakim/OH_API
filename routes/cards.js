var express = require("express");
var router = express.Router();
const cr = require("../controllers/cards");
const mwAuth = require("../middleware/auth");
const auth = require("../controllers/auth");

/* POST Add new card */
router.post("/add", mwAuth, cr.addBusinessCard);
/* GET card by Card id */
router.get("/:id", mwAuth, cr.getBusinessCard);
/* GET all cards by customer id */
router.get("/customer/:id", mwAuth, cr.getBusinessCardsList);
/* PUT update card by Card id */
router.put("/update/:id", mwAuth, cr.updateBusinessCard);
/* DELETE card by card id */
router.delete("/deletecard/:id", mwAuth, cr.deleteBusinessCard);
module.exports = router;
