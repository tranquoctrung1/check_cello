import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addItemAction } from "../../feature/AddingDevice/AddingDeviceSlice";
import { addAction as addViwaterAction } from "../../feature/viwater/ViwaterSlice";
import { addAction as addProvinceAction } from "../../feature/province/ProvinceSlice";
import axios from "axios";

import SweetAlert from "react-bootstrap-sweetalert";

import TableDevice from "./tableDevice";

import "../../styles/addingDevice.sass";

interface IFormInputs {
  Serial: string;
  ProvinceId: string;
  ProvinceName: string;
  ViwaterId: string;
  ViwaterName: string;
  IsActive: boolean;
}

const Home = () => {
  const hostname = useSelector((state: RootState) => state.hostname.value);
  const provinces = useSelector((state: RootState) => state.province.value);
  const viwaters = useSelector((state: RootState) => state.viwater.value);

  const dispatch = useDispatch();

  const [provinceName, setProvinceName] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [viwaterId, setViwaterId] = useState("");
  const [viwaterName, setViwaterName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isBusyGetDataProvince, setIsBusyGetDataProvince] = useState(false);
  const [isBusyGetDataViwater, setIsBusyGetDataViwater] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const [appear, setAppear] = useState(false);
  const [appearError, setAppearError] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setSubmitted(true);

    if (
      data.Serial === null &&
      data.Serial === undefined &&
      data.Serial === ""
    ) {
    } else if (
      provinceId === null &&
      provinceId === undefined &&
      provinceId === ""
    ) {
    } else if (
      provinceName === null &&
      provinceName === undefined &&
      provinceName === ""
    ) {
    } else if (
      viwaterId === null &&
      viwaterId === undefined &&
      viwaterId === ""
    ) {
    } else if (
      viwaterName === null &&
      viwaterName === undefined &&
      viwaterName === ""
    ) {
    } else {
      let url = `${hostname}/device/insert`;

      let obj = {
        Serial: data.Serial,
        ProvinceId: provinceId,
        ProvinceName: provinceName,
        ViwaterId: viwaterId,
        ViwaterName: viwaterName,
        IsActive: isActive,
      };

      axios
        .post(url, obj)
        .then((res) => {
          if (res.data.length >= 1) {
            dispatch(addItemAction(res.data[0]));
            setAppear(true);
          } else {
            setAppearError(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    setSubmitted(false);
  };

  function onConfirm() {
    setAppear(false);
  }

  function onErrorConfirm() {
    setAppearError(false);
  }

  useEffect(() => {
    function getDataProvince() {
      let url = `${hostname}/province/getAll`;

      axios
        .get(url)
        .then((res) => {
          dispatch(addProvinceAction(res.data));
          setIsBusyGetDataProvince(true);
        })
        .catch((err) => console.log(err.message));
    }

    function getDataViwater() {
      let url = `${hostname}/viwater/getAll`;

      axios
        .get(url)
        .then((res) => {
          dispatch(addViwaterAction(res.data));
          setIsBusyGetDataViwater(true);
        })
        .catch((err) => console.log(err.message));
    }

    getDataProvince();
    getDataViwater();
  }, []);

  function handleProvinceChange(e) {
    let _province = provinces.find((el) => el["Name"] === e.target.value);

    if (_province !== undefined) {
      setProvinceName(_province["Name"]);
      setProvinceId(_province["Id"]);
    }
  }

  function handleViwaterChange(e) {
    let _viwater = viwaters.find((el) => el["Name"] === e.target.value);

    if (_viwater !== undefined) {
      setViwaterName(_viwater["Name"]);
      setViwaterId(_viwater["Id"]);
    }
  }

  function handleCheckBoxChange() {
    setIsActive(!isActive);
  }

  return (
    <div className="container">
      <div className="container-form-table">
        <div className="container-form">
          <form className="form-adding" onSubmit={handleSubmit(onSubmit)}>
            <div className="box-form-adding">
              <h3 className="box-form-title">Th??m Thi???t B???</h3>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        className="form-control"
                        label="Serial"
                        {...field}
                      />
                    )}
                    name="Serial"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                  />
                  {errors.Serial && (
                    <div className="error">* Serial kh??ng ???????c ????? tr???ng</div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="">T??n T???nh</InputLabel>
                        <Select
                          {...field}
                          label="T??n T???nh"
                          className=""
                          onChange={handleProvinceChange}
                          value={provinceName}
                        >
                          {isBusyGetDataProvince &&
                            provinces.length > 0 &&
                            provinces.map((item, index) => {
                              if (item["Id"] !== undefined) {
                                return (
                                  <MenuItem key={index} value={item["Name"]}>
                                    {item["Name"]}
                                  </MenuItem>
                                );
                              }
                            })}
                        </Select>
                      </FormControl>
                    )}
                    control={control}
                    name="ProvinceName"
                  />

                  {provinceName === "" && submitted === true && (
                    <div className="error">* T??n t???nh kh??ng ???????c ????? tr???ng</div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        className="form-control"
                        label="ProvinceId"
                        {...field}
                        disabled
                        value={provinceId}
                      />
                    )}
                    name="ProvinceId"
                    control={control}
                    //rules={{ required: true }}
                    defaultValue=""
                  />
                  {provinceId === "" && submitted === true && (
                    <div className="error">* M?? t???nh kh??ng ???????c ????? tr???ng</div>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="">T??n Viwater</InputLabel>
                        <Select
                          {...field}
                          label="T??n Viwater"
                          className=""
                          onChange={handleViwaterChange}
                          value={viwaterName}
                        >
                          {isBusyGetDataViwater &&
                            viwaters.length > 0 &&
                            viwaters.map((item, index) => {
                              if (item["Id"] !== undefined) {
                                return (
                                  <MenuItem key={index} value={item["Name"]}>
                                    {item["Name"]}
                                  </MenuItem>
                                );
                              }
                            })}
                        </Select>
                      </FormControl>
                    )}
                    control={control}
                    name="ViwaterName"
                  />
                  {viwaterName === "" && submitted === true && (
                    <div className="error">
                      * T??n viwater kh??ng ???????c ????? tr???ng
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        className="form-control"
                        label="M?? Viwater"
                        {...field}
                        disabled
                        value={viwaterId}
                      />
                    )}
                    name="ViwaterId"
                    control={control}
                    //rules={{ required: true }}
                    defaultValue=""
                  />
                  {viwaterId === "" && submitted === true && (
                    <div className="error">
                      * M?? viwater kh??ng ???????c ????? tr???ng
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isActive}
                            onChange={handleCheckBoxChange}
                          />
                        }
                        label="Ho???t ?????ng"
                        {...field}
                      />
                    )}
                    name="IsActive"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="submit" className="btn-submit" value="Th??m" />
                </Grid>
              </Grid>

              {appear && (
                <SweetAlert success title="Th??nh c??ng" onConfirm={onConfirm}>
                  Th??m th??nh c??ng
                </SweetAlert>
              )}
              {appearError && (
                <SweetAlert error title="L???i" onConfirm={onErrorConfirm}>
                  Th??m kh??ng th??nh c??ng
                </SweetAlert>
              )}
            </div>
          </form>
        </div>
        <div className="container-table">
          {isBusyGetDataViwater &&
            isBusyGetDataProvince &&
            provinces.length > 0 &&
            viwaters.length > 0 && <TableDevice />}
        </div>
      </div>
    </div>
  );
};

export default Home;
