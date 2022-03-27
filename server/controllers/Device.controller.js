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

    let result = await DeviceModel.Insert(data);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.update = async function (req, res) {
  try {
    let data = req.body;
    res.status(200).json(await DeviceModel.Update(data).modifiedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.delete = async function (req, res) {
  try {
    let id = req.query.id;

    let result = await DeviceModel.Delete(id);

    res.status(200).json(result.deletedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
