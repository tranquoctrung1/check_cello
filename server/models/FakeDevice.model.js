const ConnectDB = require("../db/connect");

const FakeDeviceCollection = "FakeDevice";
const DeviceCollection = "Device";

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

  recivedData = {};
  recivedData.Serial = data.serial;
  recivedData.SiteId = data.siteId;
  recivedData.SiteName = data.siteName;
  recivedData.ProvinceId = data.provinceId;

  let collection = await Connect.connect(FakeDeviceCollection);
  let deviceCollection = await Connect.connect(DeviceCollection);

  let result = {};

  result.IsFakeDevice = false;
  result.IsRealDevice = false;

  if (recivedData.Serial == null || recivedData.Serial == "") {
    let checkExistsFakeDevice = await collection
      .find({
        Serial: recivedData.Serial,
        ProvinceId: recivedData.ProvinceId,
        SiteId: recivedData.SiteId,
      })
      .toArray();

    if (checkExistsFakeDevice.length <= 0) {
      let temp = [];
      temp.push(recivedData);

      await collection.insertMany(temp);
    }

    result.IsFakeDevice = true;
    result.IsRealDevice = false;
  } else {
    let check = await deviceCollection
      .find({ Serial: recivedData.Serial, ProvinceId: recivedData.ProvinceId })
      .toArray();

    if (check.length > 0) {
      result.IsRealDevice = true;
      result.IsFakeDevice = false;

      await collection.deleteMany({
        Serial: recivedData.Serial,
        ProvinceId: recivedData.ProvinceId,
      });
    } else {
      let checkExistsFakeDevice = await collection
        .find({
          Serial: recivedData.Serial,
          ProvinceId: recivedData.ProvinceId,
        })
        .toArray();

      if (checkExistsFakeDevice.length <= 0) {
        let temp = [];
        temp.push(recivedData);

        await collection.insertMany(temp);
      }

      result.IsFakeDevice = true;
      result.IsRealDevice = false;
    }
  }

  Connect.disconnect();

  return result;
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
