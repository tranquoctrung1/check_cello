const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const ProvinceRoute = require("./routers/api/Province.router");
const DeviceRoute = require("./routers/api/Device.router");
const FakeDeviceRoute = require("./routers/api/FakeDevice.router");
const ViwaterRoute = require("./routers/api/Viwater.router");

const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api/Province", ProvinceRoute);
app.use("/api/Device", DeviceRoute);
app.use("/api/FakeDevice", FakeDeviceRoute);
app.use("/api/Viwater", ViwaterRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
