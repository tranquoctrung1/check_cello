import React, { useEffect, useState, useCallback } from "react";
import { RootState } from "../../store/store";
import {
  addAction,
  deleteAction,
} from "../../feature/AddingDevice/AddingDeviceSlice";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

const TableDevice = () => {
  const value = useSelector((state: RootState) => state.addingDevice.value);
  const hostname = useSelector((state: RootState) => state.hostname.value);

  const [appear, setAppear] = useState(false);
  const [appearError, setAppearError] = useState(false);

  const [filter, setFilter] = useState({
    serial: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    province: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
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

  useEffect(() => {
    getData();
  }, []);

  function onSelectionChange(e) {
    console.log(e.value);
  }

  function handleRemoveClick(e) {
    let url = `${hostname}/device/delete?id=${e._id}`;

    axios
      .delete(url)
      .then((res) => {
        if (res.data >= 1) {
          dispatch(deleteAction(e));
          setAppear(true);
        } else {
          setAppearError(true);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function onConfirm() {
    setAppear(false);
  }

  function onErrorConfirm() {
    setAppearError(false);
  }

  function actionBodyTemplate(rowData) {
    return (
      <div>
        <Button
          className="btn-danger"
          onClick={() => handleRemoveClick(rowData)}
          type="button"
          icon="pi pi-trash"
        ></Button>
      </div>
    );
  }

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
        filters={filter}
        filterDisplay="menu"
        globalFilterFields={["serial", "privince"]}
      >
        <Column
          key="_id"
          field="_id"
          header="ID"
          sortable
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
        ></Column>
        <Column
          key="ProvinceId"
          field="ProvinceId"
          header="Mã tỉnh"
          filterField="privince"
          sortable
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
        ></Column>
        <Column
          key="Serial"
          field="Serial"
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header="Số Seri"
          filterField="serial"
          sortable
        ></Column>
        <Column
          headerStyle={{ width: "4rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
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
    </div>
  );
};

export default TableDevice;
