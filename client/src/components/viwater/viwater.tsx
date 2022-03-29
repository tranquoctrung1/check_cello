import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";

import { addItemAction } from "../../feature/viwater/ViwaterSlice";

import SweetAlert from "react-bootstrap-sweetalert";

import "../../styles/viwater.sass";

import TableViwater from "./tableViwater";

interface IFormInputs {
  Id: string;
  Name: string;
}

const Viwater = () => {
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
    let url = `${hostname}/viwater/insert`;
    axios
      .post(url, data)
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
  };

  function onConfirm() {
    setAppear(false);
  }

  function onErrorConfirm() {
    setAppearError(false);
  }

  return (
    <div className="container">
      <div className="container-box-form">
        <div className="container-form">
          <form className="form-adding" onSubmit={handleSubmit(onSubmit)}>
            <div className="box-form-adding">
              <h3 className="box-form-title">Thêm Viwater</h3>
              <Controller
                render={({ field }) => (
                  <TextField
                    className="form-control"
                    label="ID Viwater"
                    {...field}
                  />
                )}
                name="Id"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.Id && (
                <div className="error">* ID Viwater không được để trống</div>
              )}
              <Controller
                render={({ field }) => (
                  <TextField
                    type="text"
                    label="Tên Viwater"
                    className="form-control"
                    {...field}
                  />
                )}
                name="Name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.Name && (
                <div className="error">* Tên Viwater không được để trống</div>
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
          <TableViwater />
        </div>
      </div>
    </div>
  );
};

export default Viwater;
