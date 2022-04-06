var express = require("express");
var router = express.Router();

var client_controller = require("../controllers/client");

/* GET home page. */
router.get("/", client_controller.getAll);

router.get("/:id", client_controller.getById);

router.post("/", client_controller.create);

router.put("/:id", client_controller.update);

router.delete("/:id", client_controller.delete);

module.exports = router;
