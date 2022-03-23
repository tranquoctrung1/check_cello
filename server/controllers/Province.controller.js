const ProvinceModel = require("../models/Province.model");

module.exports.getAll = async function (req, res) {
  try {
    res.status(200).json(await ProvinceModel.GetAll());
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.getProvinceById = async function (req, res) {
  try {
    let id = +req.query.id;

    res.status(200).json(await ProvinceModel.GetByProvinceId(id));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.insert = async function (req, res) {
  try {
    let data = req.body;

    res
      .status(200)
      .json(await (await ProvinceModel.Insert(data)).insertedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.update = async function (req, res) {
  try {
    let data = req.body;

    res
      .status(200)
      .json(await (await ProvinceModel.Update(data)).modifiedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.delete = async function (req, res) {
  try {
    let id = +req.query.id;

    res.status(200).json(await (await ProvinceModel.Delete(id)).deletedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
