const DeviceModel = require("../models/Device.model");

module.exports.getAll = async function (req, res) {
  try {
    res.status(200).json(await DeviceModel.getAll());
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.getDeviceBySerial = async function (req, res) {
  try {
    let serial = req.query.serial;

    res.status(200).json(await DeviceModel.getDeviceBySerial(serial));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.insert = async function (req, res) {
  try {
    let data = req.body;
    res.status(200).json(await DeviceModel.insert(data).insertedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.update = async function (req, res) {
  try {
    let data = req.body;
    res.status(200).json(await DeviceModel.update(data).modifiedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.delete = async function (req, res) {
  try {
    let serial = req.query.serial;

    res.status(200).json(await DeviceModel.delete(serial).deletedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
