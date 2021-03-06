const ViwaterModel = require("../models/Viwater.model");

module.exports.getAll = async function (req, res) {
  try {
    res.status(200).json(await ViwaterModel.getAll());
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.getViwaterById = async function (req, res) {
  try {
    let id = req.query.id;

    res.status(200).json(await ViwaterModel.getViwaterById(id));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.insert = async function (req, res) {
  try {
    let data = req.body;

    let result = await ViwaterModel.Insert(data);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.update = async function (req, res) {
  try {
    let data = req.body;

    let result = await ViwaterModel.Update(data);

    res.status(200).json(result.modifiedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.delete = async function (req, res) {
  try {
    let id = req.query.id;

    let result = await ViwaterModel.Delete(id);

    res.status(200).json(result.deletedCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
