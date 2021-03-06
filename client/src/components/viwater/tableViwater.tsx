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
      <h3 className="box-form-title">Danh S??ch Thi???t B??? ???? Th??m</h3>
      <DataTable
        paginator
        rows={10}
        emptyMessage="No devices found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} devices"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        value={value}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
        dataKey="_id"
        responsiveLayout="scroll"
        filterDisplay="menu"
        resizableColumns
        globalFilterFields={["serial", "privince"]}
      >
        <Column
          key="Id"
          field="Id"
          header="M?? Viwater"
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
          header="T??n Viwater"
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
        header="Chi Ti???t Viwater"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="Id">M?? Viwater</label>
          <InputText
            id="Id"
            value={viwater["Id"]}
            onChange={(e) => onInputChange(e, "Id")}
            required
            className={classNames({ "p-invalid": submitted && !viwater["Id"] })}
          />
          {submitted && !viwater["Id"] && (
            <small className="p-error">* M?? Viwater kh??ng ???????c tr???ng!!</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="Name">T??n Viwater</label>
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
            <small className="p-error">* T??n Viwater kh??ng ???????c tr???ng!!</small>
          )}
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
          B???n s??? kh??ng kh??i ph???c l???i m?? viwater ????!
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

export default TableViwater;
