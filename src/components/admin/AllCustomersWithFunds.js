import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function AllCustomersWithFunds() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedOption === "lowest") {
      const sortedByFunds = [...data].sort((a, b) => a.fund - b.fund);
      setSortedData(sortedByFunds.slice(0, 5));
    } else if (selectedOption === "highest") {
      const sortedByFunds = [...data].sort((a, b) => b.fund - a.fund);
      setSortedData(sortedByFunds.slice(0, 5));
    } else {
      setSortedData(data);
    }
  }, [selectedOption, data]);

  const getData = () => {
    const url = `${baseUrl}/api/Admin/userList`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          const filteredData = data.listUsers.filter((user) => user.fund > 0);
          setData(filteredData);
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
      pdf.save(`AllCustomersWithFundsReport.pdf`);
    });
  };

  return (
    <Container style={{ width: "43%" }}>
      <br />
      <div>
        <select
          className="form-control"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="all">All customers</option>
          <option value="lowest">Top 5 customers with lowest funds</option>
          <option value="highest">Top 5 customers with highest funds</option>
          
        </select>
      </div>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => downloadPdfDocument("customerTable")}
      >
        <strong>Download PDF</strong>
      </button>
      <br />
      <br />
      <div id="customerTable">
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ flex: "1", textAlign: "right" }}>
            <h1 style={{ textAlign: "center" }}>List Funds Customers</h1>
            <br />
            <div style={{ textAlign: "left" }}>
              <p style={{ textAlign: "left", paddingLeft: "10px" }}>
                DrMax Pharmacy
                <br />
                Address: Example Street, No. 10, Bucharest
                <br />
                Phone: 0743121456
                <br />
                Email: contact@drmax.com
                <br />
                VAT ID: RO1234567
                <br />
                Registration No.: J40/1234/2000
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
          <div>
            <img
              style={{ width: "200px", height: "auto", marginLeft: "10px" }}
              src="../farmacia_drmax.png"
              alt="DrMax Logo"
            />
          </div>
        </div>
        {sortedData.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr className="bg-success text-white">
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Funds</th>
                <th>Status</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.email}</td>
                    <td>{val.fund}</td>
                    <td>{val.status}</td>
                    <td>{val.orderDate}</td>
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
