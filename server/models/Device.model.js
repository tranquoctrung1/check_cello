const ConnectDB = require("../db/connect");
const mongo = require("mongodb");

const DeviceCollection = "Device";

module.exports.Device = class Device {
  constructor(serial, provinceid, provincename, viwaterid, viwatername) {
    this.Serial = serial;
    this.ProvinceId = provinceid;
    this.ProvinceName = provincename;
    this.ViwaterId = viwaterid;
    this.ViwaterName = viwatername;
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

module.exports.getDeviceBySerialAndProvinceId = async function (
  serial,
  provinceid
) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection
    .find({ Serial: serial, ProvinceId: provinceid })
    .toArray();

  Connect.disconnect();

  return result;
};

module.exports.getDeviceBySerialAndProvinceIdAndViwaterId = async function (
  serial,
  provinceid,
  viwaterid
) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection
    .find({ Serial: serial, ProvinceId: provinceid, ViwaterId: viwaterid })
    .toArray();

  Connect.disconnect();

  return result;
};

module.exports.Insert = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let check = await collection
    .find({
      Serial: data.Serial,
      ProvinceId: data.ProvinceId,
      ViwaterId: data.ViwaterId,
    })
    .toArray();

  if (check.length <= 0) {
    let temp = [];
    temp.push(data);

    let result = await collection.insertMany(temp);

    if (result.insertedCount >= 1) {
      result = await collection
        .find({
          Serial: data.Serial,
          ProvinceId: data.ProvinceId,
          ViwaterId: data.ViwaterId,
        })
        .toArray();
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
    { _id: new mongo.ObjectId(data._id) },
    {
      $set: {
        ProvinceId: data.ProvinceId,
        Serial: data.Serial,
        ProvinceName: data.ProvinceName,
        ViwaterId: data.ViwaterId,
        ViwaterName: data.ViwaterName,
        IsActive: data.IsActive,
      },
    }
  );

  Connect.disconnect();

  return result;
};

module.exports.UpdateIsActive = async function (id, isactive) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(DeviceCollection);

  let result = await collection.updateMany(
    { _id: new mongo.ObjectId(id) },
    {
      $set: {
        IsActive: isactive,
      },
    }
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
