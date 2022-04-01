const ConnectDB = require("../db/connect");
const mongo = require("mongodb");

const FakeDeviceCollection = "FakeDevice";
const DeviceCollection = "Device";

module.exports.FakeDevice = class FakeDevice {
  constructor(
    serial,
    siteid,
    sitename,
    provinceid,
    provincename,
    viwaterid,
    viwatername
  ) {
    this.Serial = serial;
    this.SiteId = siteid;
    this.SiteName = sitename;
    this.ProvinceId = provinceid;
    this.ProvinceName = provincename;
    this.ViwaterId = viwaterid;
    this.ViwaterName = viwatername;
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

module.exports.getFakeDeviceBySerialAndProvinceId = async function (
  serial,
  provinceid
) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection
    .find({ Serial: serial, ProvinceId: provinceid })
    .toArray();

  Connect.disconnect();

  return result;
};

module.exports.getFakeDeviceBySerialAndProvinceIdAndViwaterId = async function (
  serial,
  provinceid,
  viwaterid
) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection
    .find({ Serial: serial, ProvinceId: provinceid, ViwaterId: viwaterid })
    .toArray();

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
  recivedData.ProvinceName = data.provinceName;
  recivedData.ViwaterId = data.viwaterId;
  recivedData.ViwaterName = data.viwaterName;

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
        ViwaterId: recivedData.ViwaterId,
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
      .find({
        Serial: recivedData.Serial,
        ProvinceId: recivedData.ProvinceId,
        ViwaterId: recivedData.ViwaterId,
      })
      .toArray();

    if (check.length > 0) {
      result.IsRealDevice = true;
      result.IsFakeDevice = false;

      await collection.deleteMany({
        Serial: recivedData.Serial,
        ProvinceId: recivedData.ProvinceId,
        ViwaterId: recivedData.ViwaterId,
        SiteId: recivedData.SiteId,
      });
    } else {
      let checkExistsFakeDevice = await collection
        .find({
          Serial: recivedData.Serial,
          ProvinceId: recivedData.ProvinceId,
          SiteId: recivedData.SiteId,
          ViwaterId: recivedData.ViwaterId,
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

module.exports.InsertDuplicateSerial = async function (data) {
  let recivedData = {};
  recivedData.Serial = data.serial;
  recivedData.SiteId = data.siteId;
  recivedData.SiteName = data.siteName;
  recivedData.ProvinceId = data.provinceId;
  recivedData.ProvinceName = data.provinceName;
  recivedData.ViwaterId = data.viwaterId;
  recivedData.ViwaterName = data.viwaterName;

  let count = 0;

  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let check = await collection
    .find({
      Serial: recivedData.Serial,
      ProvinceId: recivedData.ProvinceId,
      SiteId: recivedData.SiteId,
      ViwaterId: recivedData.ViwaterId,
    })
    .toArray();

  if (check <= 0) {
    let temp = [];
    temp.push(recivedData);

    let result = await collection.insertMany(temp);

    if (result.insertedCount > 0) {
      count += result.insertedCount;
    }
  }

  Connect.disconnect();

  return count;
};

module.exports.Update = async function (data) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.updateMany(
    { _id: data._id },
    {
      $set: {
        SiteId: data.SiteId,
        SiteName: data.SiteName,
        ProvinceId: data.ProvinceId,
        Serial: data.Serial,
        ProvinceName: data.ProvinceNamel,
        ViwaterId: data.ViwaterId,
        ViwaterName: data.ViwaterName,
      },
    }
  );

  Connect.disconnect();

  return result;
};

module.exports.Delete = async function (id) {
  let Connect = new ConnectDB.Connect();

  let collection = await Connect.connect(FakeDeviceCollection);

  let result = await collection.deleteMany({ _id: new mongo.ObjectId(id) });

  Connect.disconnect();

  return result;
};
