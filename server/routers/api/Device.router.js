const express = require("express");
const router = express.Router();

const DeviceController = require("../../controllers/Device.controller");

router.get("/getAll", DeviceController.getAll);

router.get("/getDeviceBySerial", DeviceController.getDeviceBySerial);

router.get(
  "/getDeviceBySerialAndProvinceId",
  DeviceController.getDeviceBySerialAndProvinceId
);

router.get(
  "/getDeviceBySerialAndProvinceIdAndViwaterId",
  DeviceController.getDeviceBySerialAndProvinceIdAndViwaterId
);

router.post("/insert", DeviceController.insert);

router.patch("/update", DeviceController.update);

router.patch("/updateIsActive", DeviceController.updateIsActive);

router.delete("/delete", DeviceController.delete);

module.exports = router;
