import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { addAction } from "../../feature/AddingDevice/AddingDeviceSlice";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import axios from "axios";

const TableDevice = () => {
  const value = useSelector((state: RootState) => state.addingDevice.value);
  const hostname = useSelector((state: RootState) => state.hostname.value);

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

  const [rows, setRows] = useState<Array<object>>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [value]);

  function getData() {
    let url = `${hostname}/device/getAll`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.length > 0) {
          setRows(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function onSelectionChange(e) {
    console.log(e.value);
  }

  function handleEditClick(e) {
    console.log(e);
  }

  function handleRemoveClick(e) {
    console.log(e);
  }

  function actionBodyTemplate(rowData) {
    return (
      <div>
        <Button
          className="btn-primary"
          onClick={() => handleEditClick(rowData)}
          type="button"
          icon="pi pi-pencil"
        ></Button>

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
        value={rows}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
        dataKey="_id"
        responsiveLayout="scroll"
        filters={filter}
        filterDisplay="menu"
        globalFilterFields={["serial", "privince"]}
      >
        <Column
          field="_id"
          header="ID"
          sortable
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
        ></Column>
        <Column
          field="ProvinceId"
          header="Mã tỉnh"
          filterField="privince"
          sortable
          headerStyle={{ width: "5rem" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
        ></Column>
        <Column
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
    </div>
  );
};

export default TableDevice;
