import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addAction } from "../../feature/FakeDevice/fakeDeviceSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import aixos from "axios";

import "../../styles/fakeDevice.sass";
import axios from "axios";

const FakeDevice = () => {
  const value = useSelector((state: RootState) => state.fakeDevice.value);
  const hostname = useSelector((state: RootState) => state.hostname.value);

  const [isBusyGetDataFakeDevice, setIsBusyGetDataFakeDevice] = useState(false);
  const [filters, setFilters] = useState({
    Serial: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SiteId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SiteName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ProvinceId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ProvinceName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ViwaterId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ViwaterName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    function getData() {
      let url = `${hostname}/FakeDevice/getAll`;
      axios
        .get(url)
        .then((res) => {
          if (res.data.length > 0) {
            dispatch(addAction(res.data));
            setIsBusyGetDataFakeDevice(true);
          }
        })
        .catch((err) => console.log(err.message));
    }

    getData();
  }, []);

  return (
    <div className="box-table-fake-device">
      <div className="table-fake-device">
        <h3 className="box-form-title">Danh Sách Thiết Bị Khác</h3>
        {isBusyGetDataFakeDevice && value.length > 0 && (
          <DataTable
            paginator
            rows={15}
            emptyMessage="No devices found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} devices"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            value={value}
            selectionMode="single"
            dataKey="_id"
            responsiveLayout="scroll"
            resizableColumns
            filters={filters}
            filterDisplay="row"
            globalFilterFields={[
              "Serial",
              "SiteId",
              "SiteName",
              "ProvinceId",
              "ProvinceName",
              "ViwaterId",
              "ViwaterName",
            ]}
          >
            <Column
              key="Serial"
              field="Serial"
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Số Seri"
              filterField="Serial"
              filterPlaceholder="Serial"
              filter
              sortable
            ></Column>
            <Column
              key="SiteId"
              field="SiteId"
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="ID điểm"
              filterField="SiteId"
              filterPlaceholder="Id điểm"
              filter
              sortable
            ></Column>
            <Column
              key="SiteName"
              field="SiteName"
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              header="Tên điểm"
              filterField="SiteName"
              filterPlaceholder="Tên điểm"
              filter
              sortable
            ></Column>
            <Column
              key="ProvinceId"
              field="ProvinceId"
              header="Mã tỉnh"
              filterField="ProvinceId"
              filterPlaceholder="Mã tỉnh"
              filter
              sortable
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
            ></Column>
            <Column
              key="ProvinceName"
              field="ProvinceName"
              header="Tên tỉnh"
              filterField="ProvinceName"
              filterPlaceholder="Tên tỉnh"
              filter
              sortable
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
            ></Column>
            <Column
              key="ViwaterId"
              field="ViwaterId"
              header="Mã Viwater"
              filterField="ViwaterId"
              filterPlaceholder="Id Viwater"
              filter
              sortable
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
            ></Column>

            <Column
              key="ViwaterName"
              field="ViwaterName"
              header="Tên Viwater"
              filterField="ViwaterName"
              filterPlaceholder="Tên Viwater"
              filter
              sortable
              headerStyle={{ width: "5rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
            ></Column>
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default FakeDevice;
