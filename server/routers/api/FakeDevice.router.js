const express = require("express");
const router = express.Router();
const FakeDeviceController = require("../../controllers/FakeDevice.controller");

router.get("/getAll", FakeDeviceController.getAll);

router.get(
  "/getFakeDeviceBySerial",
  FakeDeviceController.getFakeDeviceBySerial
);

router.get(
  "/getFakeDeviceBySerialAndProvinceId",
  FakeDeviceController.getFakeDeviceBySerialAndProvinceId
);

router.get(
  "/getFakeDeviceBySerialAndProvinceIdAndViwaterId",
  FakeDeviceController.getFakeDeviceBySerialAndProvinceIdAndViwaterId
);

router.get(
  "/getFakeDeviceBySiteId",
  FakeDeviceController.getFakeDeviceBySiteId
);

router.get(
  "/getFakeDeviceByProvinceId",
  FakeDeviceController.getFakeDeviceByProvinceId
);

router.post("/insert", FakeDeviceController.insert);

router.post(
  "/insertDuplicateSerial",
  FakeDeviceController.insertDuplicateSerial
);

router.patch("/update", FakeDeviceController.update);

router.delete("/delete", FakeDeviceController.delete);

module.exports = router;
