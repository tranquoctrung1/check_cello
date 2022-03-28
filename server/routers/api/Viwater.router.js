const express = require("express");
const router = express.Router();

const ViwaterController = require("../../controllers/Viwater.controller");

router.get("/getAll", ViwaterController.getAll);

router.get("/getViwaterById", ViwaterController.getViwaterById);

router.post("/insert", ViwaterController.insert);

router.patch("/update", ViwaterController.update);

router.delete("/delete", ViwaterController.delete);

module.exports = router;
