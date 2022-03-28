const ConnectDB = require("../db/connect");

const ViwaterCollection = "Province";

module.exports.Viwater = class Viwater {
  constructor(id, name) {
    this.Id = id;
    this.Name = name;
  }
};

module.exports.getAll = async function () {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(ViwaterCollection);

  let result = await collection.find({}).toArray();

  Connect.disconnect();

  return result;
};

module.exports.getViwaterById = async function (id) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(ViwaterCollection);

  let result = await collection.find({ Id: id }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.Insert = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(ViwaterCollection);

  let check = await collection.find({ Id: data.Id }).toArray();

  if (check.length <= 0) {
    let temp = [];
    temp.push(data);

    let result = await collection.insertMany(temp);

    Connect.disconnect();

    return result;
  }
  return 0;
};

module.exports.Update = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(ViwaterCollection);

  const result = await collection.updateMany(
    { _id: data._id },
    { $set: { Name: data.Name, Id: data.Id } }
  );

  Connect.disconnect();

  return result;
};

module.exports.Delete = async function (id) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(ViwaterCollection);

  let result = await collection.deleteMany({ _id: id });

  Connect.disconnect();

  return result;
};
