const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/", adminController.checkData);

module.exports = router;