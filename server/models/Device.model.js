const ConnectDB = require("../db/connect");

const DeviceCollection = "Device";

module.exports.Device = class Device {
  constructor(serial, provinceid) {
    this.Serial = serial;
    this.ProvinceId = provinceid;
  }
};

module.exports.getAll = async function () {
  let Connect = new ConnectDB.Connect();

  let collection = Connect.connect(DeviceCollection);

  let result = await collection.find({}).toArray();

  Connect.disconnect();

  return result;
};

module.exports.getDeviceBySerial = async function (serial) {
  let Connect = new ConnectDB.Connect();

  let collection = Connect.connect(DeviceCollection);

  let result = await collection.find({ Serial: serial }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.Insert = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = Connect.connect(DeviceCollection);

  let temp = [];
  temp.push(data);

  let result = await collection.insertMany(temp);

  Connect.disconnect();

  return result;
};

module.exports.Update = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = Connect.connect(DeviceCollection);

  let result = await collection.updateMany(
    { Serial: data.Serial },
    { $set: { ProvinceId: data.ProvinceId } }
  );

  Connect.disconnect();

  return result;
};

module.exports.Delete = async function (serial) {
  let Connect = new ConnectDB.Connect();

  let collection = Connect.connect(DeviceCollection);

  let result = await collection.deleteMany({ Serial: serial });

  Connect.disconnect();

  return result;
};
