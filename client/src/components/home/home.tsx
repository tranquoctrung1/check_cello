import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addItemAction } from "../../feature/AddingDevice/AddingDeviceSlice";
import axios from "axios";

import SweetAlert from "react-bootstrap-sweetalert";

import TableDevice from "./tableDevice";

import "../../styles/addingDevice.sass";

interface IFormInputs {
  Serial: string;
  ProvinceId: number;
}

const Home = () => {
  const hostname = useSelector((state: RootState) => state.hostname.value);

  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const [appear, setAppear] = useState(false);
  const [appearError, setAppearError] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    let url = `${hostname}/device/insert`;

    axios
      .post(url, data)
      .then((res) => {
        if (res.data >= 1) {
          dispatch(addItemAction(res.data));
          setAppear(true);
        } else {
          setAppearError(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function onConfirm() {
    setAppear(false);
  }

  function onErrorConfirm() {
    setAppearError(false);
  }

  return (
    <div className="container">
      <div className="container-form-table">
        <div className="container-form">
          <form className="form-adding" onSubmit={handleSubmit(onSubmit)}>
            <div className="box-form-adding">
              <h3 className="box-form-title">Thêm Thiết Bị</h3>
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
                <div className="error">* Serial không được để trống</div>
              )}
              <Controller
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="Mã tỉnh"
                    className="form-control"
                    {...field}
                  />
                )}
                name="ProvinceId"
                control={control}
                defaultValue={0}
                rules={{ required: true }}
              />
              {errors.ProvinceId && (
                <div className="error">* Mã tỉnh không được để trống</div>
              )}
              <input type="submit" className="btn-submit" value="Thêm" />
              {appear && (
                <SweetAlert success title="Thành công" onConfirm={onConfirm}>
                  Thêm thành công
                </SweetAlert>
              )}
              {appearError && (
                <SweetAlert error title="Lỗi" onConfirm={onErrorConfirm}>
                  Thêm không thành công
                </SweetAlert>
              )}
            </div>
          </form>
        </div>
        <div className="container-table">
          <TableDevice />
        </div>
      </div>
    </div>
  );
};

export default Home;