import React, { useEffect, useState, useCallback } from "react";
import { RootState } from "../../store/store";
import {
  addAction,
  deleteAction,
  updateAction,
  updateIsActiveLockAction,
  updateIsActiveOpenLockAction,
} from "../../feature/AddingDevice/AddingDeviceSlice";

import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";

const TableDevice = () => {
  const value = useSelector((state: RootState) => state.addingDevice.value);
  const hostname = useSelector((state: RootState) => state.hostname.value);
  const provinces = useSelector((state: RootState) => state.province.value);
  const viwaters = useSelector((state: RootState) => state.viwater.value);

  const [appear, setAppear] = useState(false);
  const [appearError, setAppearError] = useState(false);
  const [appearEdit, setAppearEdit] = useState(false);
  const [appearEditError, setAppearEditError] = useState(false);
  const [appearWarningDelete, setAppearWarningDelete] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [device, setDevice] = useState({});
  const [viwaterOptions, setViwaterOptions] = useState<Array<object>>([]);
  const [provinceOptions, setProvinceOptions] = useState<Array<object>>([]);
  const [province, setProvince] = useState({});
  const [viwater, setViwater] = useState({});
  const [isBusyGetDataProvince, setIsBusyGetDataProvince] = useState(false);
  const [isBusyGetDataViwater, setIsBusyGetDataViwater] = useState(false);
  const [deviceDelete, setDeviceDelete] = useState({});

  const [filters, setFilters] = useState({
    Serial: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ProvinceId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ProvinceName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ViwaterId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ViwaterName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const dispatch = useDispatch();

  const getData = useCallback(() => {
    let url = `${hostname}/device/getAll`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(addAction(res.data));
        }
      })
      .catch((err) => console.log(err.message));
  }, [hostname, dispatch]);

  function convertOptionsProvince() {
    if (provinces.length > 0) {
      let provinceOption: Array<object> = [];

      for (let item of provinces) {
        let obj = {
          code: item["Id"],
          name: item["Name"],
        };

        provinceOption.push(obj);
      }
      setProvinceOptions([...provinceOption]);
      setIsBusyGetDataProvince(true);
    }
    let url = `${hostname}/province/getAll`;

    axios
      .get(url)
      .then((res) => {
        if (res.data.length > 0) {
          let provinceOption: Array<object> = [];

          for (let item of provinces) {
            let obj = {
              code: item["Id"],
              name: item["Name"],
            };

            provinceOption.push(obj);
          }
          setProvinceOptions([...provinceOption]);
          setIsBusyGetDataProvince(true);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function convertOptionViwater() {
    if (viwaters.length > 0) {
      let viwaterOptions: Array<object> = [];

      for (let item of viwaters) {
        let obj = {
          code: item["Id"],
          name: item["Name"],
        };

        viwaterOptions.push(obj);
      }

      setViwaterOptions([...viwaterOptions]);
      setIsBusyGetDataViwater(true);
    }

    let url = `${hostname}/viwater/getAll`;

    axios
      .get(url)
      .then((res) => {
        let viwaterOptions: Array<object> = [];

        for (let item of viwaters) {
          let obj = {
            code: item["Id"],
            name: item["Name"],
          };

          viwaterOptions.push(obj);
        }

        setViwaterOptions([...viwaterOptions]);
        setIsBusyGetDataViwater(true);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    getData();
    convertOptionsProvince();
    convertOptionViwater();
  }, []);

  function onSelectionChange(e) {
    //console.log(e.value);
  }

  function handleRemoveClick(data) {
    setAppearWarningDelete(true);

    setDeviceDelete({ ...data });
  }

  function onDeleteConfirm() {
    let url = `${hostname}/device/delete?id=${deviceDelete["_id"]}`;
    axios.delete(url).then((res) => {
      if (res.data >= 1) {
        dispatch(deleteAction(deviceDelete));

        setAppearWarningDelete(false);
        setAppear(true);
      } else {
        setAppearError(true);
      }
    });
  }

  function onCancelDelete() {
    setAppearWarningDelete(false);
  }

  function handleEditClick(data) {
    setDevice({ ...data });
    setEditDialog(true);
  }

  function onConfirm() {
    setAppear(false);
  }

  function onErrorConfirm() {
    setAppearError(false);
  }

  function actionBodyTemplate(rowData) {
    let lockButton;

    if (rowData.IsActive === false) {
      lockButton = (
        <Button
          icon="pi pi-lock"
          className="p-button-rounded p-button-danger mr-2"
          onClick={() => handleOpenLockClick(rowData)}
        />
      );
    } else {
      lockButton = (
        <Button
          icon="pi pi-lock-open"
          className="p-button-rounded p-button-primary mr-2"
          onClick={() => handleLockClick(rowData)}
        />
      );
    }

    return (
      <div>
        <React.Fragment>
          {lockButton}
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
            onClick={() => handleEditClick(rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => handleRemoveClick(rowData)}
          />
        </React.Fragment>
      </div>
    );
  }

  const hideDialog = () => {
    setSubmitted(false);
    setEditDialog(false);
  };

  const saveItem = () => {
    setSubmitted(true);

    let url = `${hostname}/device/update`;

    axios.patch(url, device).then((res) => {
      if (res.data >= 1) {
        dispatch(updateAction(device));

        setEditDialog(false);
        setAppearEdit(true);
      } else {
        setAppearEditError(true);
        setEditDialog(true);
      }
    });
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveItem}
      />
    </React.Fragment>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";

    let _device = { ...device };
    _device[`${name}`] = val;
    setDevice(_device);
  };

  function onProvinceChange(e) {
    setProvince(e.value);

    setDevice({
      ...device,
      ProvinceId: e.value.code,
      ProvinceName: e.value.name,
    });
  }

  function onViwaterChange(e) {
    setViwater(e.value);
    setDevice({
      ...device,
      ViwaterId: e.value.code,
      ViwaterName: e.value.name,
    });
  }

  function onEditConfirm() {
    setAppearEdit(false);
  }

  function onEditErrorConfirm() {
    setAppearEditError(false);
  }

  function onIsActiveChange(e) {
    setDevice({ ...device, IsActive: !device["IsActive"] });
  }

  function handleOpenLockClick(data) {
    let url = `${hostname}/device/updateIsActive?id=${data["_id"]}&isActive=true`;

    axios
      .patch(url)
      .then((res) => {
        if (res.data >= 1) {
          setAppearEdit(true);
          dispatch(updateIsActiveOpenLockAction(data));
        } else {
          setAppearEditError(true);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function handleLockClick(data) {
    let url = `${hostname}/device/updateIsActive?id=${data["_id"]}&isActive=false`;

    axios
      .patch(url)
      .then((res) => {
        if (res.data >= 1) {
          setAppearEdit(true);
          dispatch(updateIsActiveLockAction(data));
        } else {
          setAppearEditError(true);
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <h3 className="box-form-title">Danh S??ch Thi???t B??? ???? Th??m</h3>
      <DataTable
        paginator
        rows={5}
        emptyMessage="No devices found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} devices"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        value={value}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
        dataKey="_id"
        responsiveLayout="scroll"
        filters={filters}
        filterDisplay="row"
        globalFilterFields={[
          "Serial",
          "ProvinceId",
          "ProvinceName",
          "ViwaterId",
          "ViwaterName",
        ]}
        resizableColumns
      >
        <Column
          key="Serial"
          field="Serial"
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header="S??? Seri"
          filterField="Serial"
          filterPlaceholder="Serial"
          filter
          sortable
        ></Column>
        <Column
          key="ProvinceId"
          field="ProvinceId"
          header="M?? t???nh"
          filterField="ProvinceId"
          filterPlaceholder="M?? t???nh"
          filter
          sortable
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
        ></Column>

        <Column
          key="ProvinceName"
          field="ProvinceName"
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header="T??n T???nh"
          filterField="ProvinceName"
          filterPlaceholder="T??n t???nh"
          filter
          sortable
        ></Column>
        <Column
          key="ViwaterId"
          field="ViwaterId"
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header="M?? Viwater"
          filterField="ViwaterId"
          filterPlaceholder="M?? Viwatwer"
          filter
          sortable
        ></Column>
        <Column
          key="ViwaterName"
          field="ViwaterName"
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header="T??n Viwater"
          filterField="ViwaterName"
          filterPlaceholder="T??n Viwatwer"
          filter
          sortable
        ></Column>
        <Column
          headerStyle={{ width: "4rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        header="Chi Ti???t Thi???t B???"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="Serial">Serial</label>
          <InputText
            id="Serial"
            value={device["Serial"]}
            onChange={(e) => onInputChange(e, "Serial")}
            required
            className={classNames({
              "p-invalid": submitted && !device["Serial"],
            })}
          />
          {submitted && !device["Serial"] && (
            <small className="p-error">* S??? Seri kh??ng ???????c tr???ng!!</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="provinceName">Ch???n T???nh</label>
          {isBusyGetDataProvince && provinceOptions.length > 0 && (
            <Dropdown
              id="provinceName"
              value={province}
              options={provinceOptions}
              onChange={onProvinceChange}
              optionLabel="name"
              placeholder="Ch???n t???nh"
            />
          )}

          {submitted && !device["ProvinceName"] && (
            <small className="p-error">* T??n T???nh kh??ng ???????c tr???ng!!</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="provinceId">M?? T???nh</label>
          <InputText
            id="ProvinceId"
            value={device["ProvinceId"]}
            onChange={(e) => onInputChange(e, "ProvinceId")}
            required
            disabled
            className={classNames({
              "p-invalid": submitted && !device["ProvinceId"],
            })}
          />
          {submitted && !device["ProvinceId"] && (
            <small className="p-error">* M?? T???nh kh??ng ???????c tr???ng!!</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="ViwaterName">Ch???n Viwater</label>
          {isBusyGetDataViwater && viwaterOptions.length > 0 && (
            <Dropdown
              id="ViwaterName"
              value={viwater}
              options={viwaterOptions}
              onChange={onViwaterChange}
              optionLabel="name"
              placeholder="Ch???n viwater"
            />
          )}

          {submitted && !device["ViwaterName"] && (
            <small className="p-error">* T??n Viwater kh??ng ???????c tr???ng!!</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="ViwaterId">M?? Viwater</label>
          <InputText
            id="ViwaterId"
            value={device["ViwaterId"]}
            onChange={(e) => onInputChange(e, "ViwaterId")}
            required
            disabled
            className={classNames({
              "p-invalid": submitted && !device["ViwaterId"],
            })}
          />
          {submitted && !device["ViwaterId"] && (
            <small className="p-error">* M?? Viwater kh??ng ???????c tr???ng!!</small>
          )}
        </div>

        <div className="field">
          <Checkbox
            id="IsActive"
            checked={device["IsActive"]}
            onChange={(e) => onIsActiveChange(e)}
          />
          <label className="label-checkbox" htmlFor="IsActive">
            Ho???t ?????ng
          </label>
        </div>
      </Dialog>
      {appearWarningDelete && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="X??a"
          confirmBtnBsStyle="danger"
          title="B???n c?? ch???c mu???n x??a?"
          onConfirm={onDeleteConfirm}
          onCancel={onCancelDelete}
          focusCancelBtn
          cancelBtnText="H???y"
          cancelBtnBsStyle="success"
        >
          B???n s??? kh??ng kh??i ph???c l???i thi???t b??? ????!
        </SweetAlert>
      )}
      {appear && (
        <SweetAlert success title="Th??nh c??ng" onConfirm={onConfirm}>
          X??a th??nh c??ng
        </SweetAlert>
      )}
      {appearError && (
        <SweetAlert error title="L???i" onConfirm={onErrorConfirm}>
          X??a kh??ng th??nh c??ng
        </SweetAlert>
      )}
      {appearEdit && (
        <SweetAlert success title="Th??nh c??ng" onConfirm={onEditConfirm}>
          C???p nh???t th??nh c??ng
        </SweetAlert>
      )}
      {appearEditError && (
        <SweetAlert error title="L???i" onConfirm={onEditErrorConfirm}>
          C???p nh???t kh??ng th??nh c??ng
        </SweetAlert>
      )}
    </div>
  );
};

export default TableDevice;
