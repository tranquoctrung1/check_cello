const ConnectDB = require("../db/connect");
const mongo = require("mongodb");

const DeviceCollection = "Device";

module.exports.Device = class Device {
  constructor(serial, provinceid) {
    this.Serial = serial;
    this.ProvinceId = provinceid;
  }
};

module.exports.getAll = async function () {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection.find({}).toArray();

  Connect.disconnect();

  return result;
};

module.exports.getDeviceBySerial = async function (serial) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection.find({ Serial: serial }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.Insert = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let check = await collection
    .find({ Serial: data.Serial, ProvinceId: data.ProvinceId })
    .toArray();

  if (check.length <= 0) {
    let temp = [];
    temp.push(data);

    let result = await collection.insertMany(temp);

    if (result.insertedCount >= 1) {
      result = await collection.find({ Serial: data.Serial }).toArray();
    }

    Connect.disconnect();

    return result;
  }

  return [];
};

module.exports.Update = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection.updateMany(
    { Serial: data.Serial },
    { $set: { ProvinceId: data.ProvinceId } }
  );

  Connect.disconnect();

  return result;
};

module.exports.Delete = async function (id) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection.deleteMany({ _id: new mongo.ObjectId(id) });

  Connect.disconnect();

  return result;
};
