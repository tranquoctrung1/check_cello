const ConnectDB = require("../db/connect");

const FakeDeviceCollection = "FakeDevice";

module.exports.FakeDevice = class FakeDevice {
  constructor(serial, siteid, sitename, provinceid) {
    this.Serial = serial;
    this.SiteId = siteid;
    this.SiteName = sitename;
    this.ProvinceId = provinceid;
  }
};

module.exports.getAll = async function () {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.find({}).toArray();

  Connect.disconnect();

  return result;
};

module.exports.getFakeDeviceBySerial = async function (serial) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.find({ Serial: serial }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.getFakeDeviceBysiteId = async function (siteid) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.find({ SiteId: siteid }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.getFakeDeviceByProvinceId = async function (provinceid) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.find({ ProvinceId: provinceid }).toArray();

  Connect.disconnect();

  return result;
};

module.exports.Insert = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let count = 0;

  for (let item of data) {
    let check = await collection.find({ Serial: item.Serial }).toArray();

    if (check.length <= 0) {
      let temp = [];
      temp.push(item);

      let result = await collection.insertMany(temp);

      if (result.insertedCount != null && result.insertedCount != undefined) {
        count += result.insertedCount;
      }
    }
  }

  Connect.disconnect();

  return count;
};

module.exports.Update = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.updateMany(
    { Serial: data.Serial },
    {
      $set: {
        SiteId: data.SiteId,
        SiteName: data.SiteName,
        ProvinceId: data.ProvinceId,
      },
    }
  );

  Connect.disconnect();

  return result;
};

module.exports.Delete = async function (serial) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.deleteMany({ Serial: serial });

  Connect.disconnect();

  return result;
};
