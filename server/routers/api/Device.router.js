const express = require("express");
const router = express.Router();

const DeviceController = require("../../controllers/Device.controller");

router.get("/getAll", DeviceController.getAll);

router.get("/getDeviceBySerial", DeviceController.getDeviceBySerial);

router.post("/insert", DeviceController.insert);

router.patch("/update", DeviceController.update);

router.delete("/delete", DeviceController.delete);

module.exports = router;
