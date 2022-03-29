import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

import {
  addAction,
  updateItemAction,
  deleteItemAction,
} from "../../feature/viwater/ViwaterSlice";

import SweetAlert from "react-bootstrap-sweetalert";

const TableViwater = () => {
  const value = useSelector((state: RootState) => state.viwater.value);
  const hostname = useSelector((state: RootState) => state.hostname.value);

  const [appear, setAppear] = useState(false);
  const [appearError, setAppearError] = useState(false);
  const [appearEdit, setAppearEdit] = useState(false);
  const [appearEditError, setAppearEditError] = useState(false);
  const [appearWarningDelete, setAppearWarningDelete] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viwater, setViwater] = useState({});
  const [viwaterDelete, setViwaterDelete] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    function getData() {
      let url = `${hostname}/viwater/getAll`;

      axios
        .get(url)
        .then((res) => {
          dispatch(addAction(res.data));
        })
        .catch((err) => console.log(err.message));
    }

    getData();
  }, []);

  function onConfirm() {
    setAppear(false);
  }

  function onErrorConfirm() {
    setAppearError(false);
  }

  function onEditConfirm() {
    setAppearEdit(false);
  }

  function onEditErrorConfirm() {
    setAppearEditError(false);
  }

  function onSelectionChange(e) {
    // console.log(e.value);
  }

  function onDeleteConfirm() {
    let url = `${hostname}/viwater/delete?id=${viwaterDelete["_id"]}`;
    axios.delete(url).then((res) => {
      if (res.data >= 1) {
        dispatch(deleteItemAction(viwaterDelete));

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

  const editItem = (data) => {
    setViwater({ ...data });
    setEditDialog(true);
  };

  const deleteItem = (data) => {
    setAppearWarningDelete(true);

    setViwaterDelete({ ...data });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editItem(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteItem(rowData)}
        />
      </React.Fragment>
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEditDialog(false);
  };

  const saveItem = () => {
    setSubmitted(true);

    if (viwater["Id"] !== "" && viwater["Name"] !== "") {
      let url = `${hostname}/viwater/update`;

      axios.patch(url, viwater).then((res) => {
        if (res.data >= 1) {
          dispatch(updateItemAction(viwater));

          setEditDialog(false);
          setAppearEdit(true);
        } else {
          setAppearEditError(true);
          setEditDialog(true);
        }
      });
    }
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

    let _viwater = { ...viwater };
    _viwater[`${name}`] = val;
    setViwater(_viwater);
  };

  return (
    <div>
      <h3 className="box-form-title">Danh Sách Thiết Bị Đã Thêm</h3>
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
        filterDisplay="menu"
        globalFilterFields={["serial", "privince"]}
      >
        <Column
          key="Id"
          field="Id"
          header="Mã Viwater"
          filterField="viwaterId"
          sortable
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
        ></Column>
        <Column
          key="Name"
          field="Name"
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header="Tên Viwater"
          filterField="Name"
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
        header="Chi Tiết Viwater"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="Id">Mã Viwater</label>
          <InputText
            id="Id"
            value={viwater["Id"]}
            onChange={(e) => onInputChange(e, "Id")}
            required
            className={classNames({ "p-invalid": submitted && !viwater["Id"] })}
          />
          {submitted && !viwater["Id"] && (
            <small className="p-error">* Mã Viwater không được trống!!</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="Name">Tên Viwater</label>
          <InputText
            id="Name"
            value={viwater["Name"]}
            onChange={(e) => onInputChange(e, "Name")}
            required
            className={classNames({
              "p-invalid": submitted && !viwater["Name"],
            })}
          />
          {submitted && !viwater["Name"] && (
            <small className="p-error">* Tên Viwater không được trống!!</small>
          )}
        </div>
      </Dialog>
      {appearWarningDelete && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Xóa"
          confirmBtnBsStyle="danger"
          title="Bạn có chắc muốn xóa?"
          onConfirm={onDeleteConfirm}
          onCancel={onCancelDelete}
          focusCancelBtn
          cancelBtnText="Hủy"
          cancelBtnBsStyle="success"
        >
          Bạn sẽ không khôi phục lại mã viwater đó!
        </SweetAlert>
      )}
      {appear && (
        <SweetAlert success title="Thành công" onConfirm={onConfirm}>
          Xóa thành công
        </SweetAlert>
      )}
      {appearError && (
        <SweetAlert error title="Lỗi" onConfirm={onErrorConfirm}>
          Xóa không thành công
        </SweetAlert>
      )}
      {appearEdit && (
        <SweetAlert success title="Thành công" onConfirm={onEditConfirm}>
          Cập nhật thành công
        </SweetAlert>
      )}
      {appearEditError && (
        <SweetAlert error title="Lỗi" onConfirm={onEditErrorConfirm}>
          Cập nhật không thành công
        </SweetAlert>
      )}
    </div>
  );
};

export default TableViwater;
