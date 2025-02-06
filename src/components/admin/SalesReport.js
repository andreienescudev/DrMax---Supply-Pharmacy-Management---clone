import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../users/modal.css";

const SalesReport = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [createdOn, setORderCreatedOn] = useState("");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    getData("UserItems", id);
  }, []);

  const getData = (type, id) => {
    const data = {
      ID: parseInt(id),
      type: type,
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/Medicines/orderList`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setOrderNo(data.listOrders[0].orderNo);
          setOrderTotal(data.listOrders[0].orderTotal);
          setORderCreatedOn(data.listOrders[0].createdOn);
          setCustomerName(data.listOrders[0].customerName);
          type === "User"
            ? setData(data.listOrders)
            : setItemData(data.listOrders);
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
      pdf.save(`SalesReport_${orderNo}'.pdf`);
    });
  };

  return (
    <Fragment>
      <br></br>
      <button
        class="btn btn-primary"
        onClick={() => downloadPdfDocument("testId")}
      >
        <strong>Download PDF</strong>
      </button>
      <br></br>
      <br></br>
      <div
        id="testId"
        style={{ width: "850px", margin: "auto", padding: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "200px", height: "auto", marginRight: "10px" }}
            src="../farmacia_drmax.png"
            alt="DrMax Logo"
          />
          <div>
            <h1 style={{ margin: "0", textAlign: "center" }}>
              Sales Invoice: <br></br>
              <h5>{orderNo}</h5>
            </h1>
            <p
              style={{ margin: "0", display: "flex", justifyContent: "center" }}
            >
              <span style={{ marginRight: "5px" }}>Series: ABC123</span>
              <span style={{ marginLeft: "2px" }}>Date: {createdOn}</span>
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <p style={{ textAlign: "left" }}>
              <strong>
                <h3>Customer:</h3>
              </strong>
              Full name: {customerName}
              <br />
              Adress: Str. Cumpărătorului nr. 1, București
              <br />
              Phone number: 0723123456
              <br />
            </p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p>
              <strong>
                <h5>Legal entity:</h5>
              </strong>
              CIF: -
              <br />
              Trade Registry: -
              <br />
              CUI: -
              <br />
            </p>
          </div>
        </div>
        <table
          style={{
            width: "100%",
            marginBottom: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Crt. Nr.
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Product or Service Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                U.M.
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Quantity
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Unit price (excluding VAT) <br></br>-RON-
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Value (excluding VAT)<br></br>-RON-
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                VAT value<br></br>-RON-
              </th>
            </tr>
          </thead>
          <tbody>
            {itemData.map((val, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {val.medicineName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  pcs
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {val.quantity}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {(val.unitPrice * 0.81).toFixed(2)}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {(val.totalPrice * 0.81).toFixed(2)}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {(val.totalPrice * 0.19).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "right",
                  border: "1px solid black",
                  padding: "8px",
                }}
              >
                <div style={{ textAlign: "right", marginBottom: "20px" }}>
                  <h3>
                    <strong>Collected Amount:</strong> {orderTotal} RON
                  </h3>
                </div>
              </td>
            </tr>
          </tfoot>
          <tfoot>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "right",
                  border: "1px solid black",
                  padding: "8px",
                }}
              >
                <div style={{ width: "80%", textAlign: "left" }}>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>Delegate:</strong> ...Mihai Valentin...
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>CNP:</strong>...1990403287341...
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>B.I./C.I.:</strong> ...B.I.....
                  </div>
                  <div>
                    <strong>Transportation:</strong> ...auto...{" "}
                    <strong>nr:</strong>...B 01 ASD...
                  </div>
                  <br></br>
                  <div>
                    <strong>Signature:</strong>{" "}
                    ............................................................
                  </div>
                </div>
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <div>
                  <strong>{(orderTotal * 0.81).toFixed(2)}</strong>
                </div>
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <div>
                  <strong>{(orderTotal * 0.19).toFixed(2)}</strong>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
};

export default SalesReport;
