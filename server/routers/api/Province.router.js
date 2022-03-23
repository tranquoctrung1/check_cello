const express = require("express");
const router = express.Router();

const ProvinceController = require("../../controllers/Province.controller");

router.get("/getAll", ProvinceController.getAll);

router.get("/getProvinceById", ProvinceController.getProvinceById);

router.post("/insert", ProvinceController.insert);

router.patch("/update", ProvinceController.update);

router.delete("/delete", ProvinceController.delete);

module.exports = router;
