const FakeDeviceModel = require("../models/FakeDevice.model");

module.exports.getAll = async function (req, res) {
  try {
    res.status(200).json(await FakeDeviceModel.getAll());
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.getFakeDeviceBySerial = async function (req, res) {
  try {
    let serial = req.query.serial;

    res.status(200).json(await FakeDeviceModel.getFakeDeviceBySerial(serial));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.getFakeDeviceBySiteId = async function (req, res) {
  try {
    let siteid = req.query.siteid;

    res.status(200).json(await FakeDeviceModel.getFakeDeviceBysiteId(siteid));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.getFakeDeviceByProvinceId = async function (req, res) {
  try {
    let provinceid = req.query.provinceid;

    res
      .status(200)
      .json(await FakeDeviceModel.getFakeDeviceByProvinceId(provinceid));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.insert = async function (req, res) {
  try {
    let data = req.body;

    res.status(200).json(await FakeDeviceModel.Insert(data));
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

module.exports.update = async function (req, res) {
  try {
    let data = req.body;

    res
      .status(200)
      .json(await (await FakeDeviceModel.Update(data)).modifiedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.delete = async function (req, res) {
  try {
    let serial = req.query;

    res
      .status(200)
      .json(await (await FakeDeviceModel.Delete(serial)).deletedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
