import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function AllStorno() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    fetchData("user", 0);
  }, []);

  const fetchData = (type, id) => {
    const requestData = {
      ID: id,
      type: type,
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/Medicines/orderList`;
    axios
      .post(url, requestData)
      .then((response) => {
        const responseData = response.data;
        if (responseData.statusCode === 200) {
          const filteredOrders = responseData.listOrders.filter(
            (item) => item.orderStatus === "Cancel"
          );
          setData(filteredOrders);
          setFilteredData(filteredOrders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`AllStornoReport.pdf`);
    });
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (month === "") {
      setFilteredData(data); // Show all data
    } else {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.createdOn);
        const selectedYearInt = parseInt(selectedYear, 10);
        return (
          itemDate.getMonth() === parseInt(month, 10) &&
          itemDate.getFullYear() === selectedYearInt
        );
      });
      setFilteredData(filtered);
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.createdOn);
      const selectedMonthInt = parseInt(selectedMonth, 10);
      return (
        itemDate.getMonth() === selectedMonthInt &&
        itemDate.getFullYear() === parseInt(year, 10)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <Container style={{ width: "43%" }}>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => downloadPdfDocument("salesTable")}
      >
        <strong>Download PDF</strong>
      </button>
      <div style={{ marginLeft: "10px" }}>
        <p>Please select the month and year you want:</p>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Month</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
      <br />
      <br />
      <div id="salesTable">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ flex: "1", textAlign: "right" }}>
            <h1 style={{ textAlign: "center" }}>Total cancellation invoice</h1>
            <br />
            <div style={{ textAlign: "left" }}>
              <p style={{ textAlign: "left", paddingLeft: "10px" }}>
                DrMax Pharmacy
                <br />
                Address: Example Street No. 10, Bucharest
                <br />
                Phone: 0743121456
                <br />
                Email: contact@drmax.com
                <br />
                VAT Number: RO1234567
                <br />
                Trade Registry: J40/1234/2000
                <br />
                Share Capital: 10000 RON
                <br />
                Bank Account: RO12 BTRL 1234 5678 9012 34XX
                <br />
                Bank: Banca Transilvania
              </p>
              <p style={{ textAlign: "left", paddingLeft: "10px" }}>
                Report Generation Date: {currentDate}
              </p>
            </div>
          </div>
        </div>
        {filteredData.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr className="bg-success text-white">
                <th>#</th>
                <th>Customer Name</th>
                <th>Order No</th>
                <th>Total</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.customerName}</td>
                    <td>{val.orderNo}</td>
                    <td>{val.orderTotal}</td>
                    <td>{val.orderStatus}</td>
                    <td>{val.createdOn}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>No data found</p>
        )}
      </div>
    </Container>
  );
}
