var express = require("express");
var router = express.Router();
const cr = require("../controllers/cards");

/* POST Add new card */
router.post("/add", cr.addBusinessCard);
/* GET card by Card id */
router.get("/:id", cr.getBusinessCard);
/* GET all cards by customer id */
router.get("/customer/:id", cr.getBusinessCardsList);
/* PUT update card by Card id */
router.put("/update/:id", cr.updateBusinessCard);
/* DELETE card by card id */
router.delete("/deletecard/:id", cr.deleteBusinessCard);
module.exports = router;
