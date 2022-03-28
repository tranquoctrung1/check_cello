const ConnectDB = require("../db/connect");

const ProvinceCollection = "Province";

module.exports.ProvinceModel = class Province {
  constructor(id, name) {
    this.Id = id;
    this.Name = name;
  }
};

module.exports.Insert = async function (data) {
  let Connect = new ConnectDB.Connect();

  const collection = await Connect.connect(ProvinceCollection);

  let temp = [];
  temp.push(data);

  const result = await collection.insertMany(temp);

  Connect.disconnect();

  return result;
};

module.exports.GetAll = async function () {
  let Connect = new ConnectDB.Connect();

  const collection = await Connect.connect(ProvinceCollection);

  const result = await collection.find({}).toArray();

  Connect.disconnect();

  return result;
};

module.exports.GetByProvinceId = async function (id) {
  let Connect = new ConnectDB.Connect();

  const collection = await Connect.connect(ProvinceCollection);

  const result = await collection.find({ Id: id }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.Update = async function (data) {
  let Connect = new ConnectDB.Connect();
  const collection = await Connect.connect(ProvinceCollection);

  const result = await collection.updateMany(
    { Id: data.Id },
    { $set: { Name: data.Name } }
  );

  Connect.disconnect();

  return result;
};

module.exports.Delete = async function (id) {
  let Connect = new ConnectDB.Connect();
  const collection = await Connect.connect(ProvinceCollection);

  const result = await collection.deleteMany({ Id: id });

  Connect.disconnect();
  return result;
};
