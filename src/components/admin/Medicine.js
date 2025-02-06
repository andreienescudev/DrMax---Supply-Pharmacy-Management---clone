import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { baseUrl } from "../constants";

export default function Medicine() {
  const [data, setData] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expdate, setExpdate] = useState("data expirare");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [addUpdateFlag, setAddUpdateFlag] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const data = {
      type: "Get",
      Email: localStorage.getItem("loggedEmail"),
    };
    const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listMedicines);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMedicine = (e, id) => {
    debugger;
    e.preventDefault();
    const data = {
      Id: id,
      Type: "Delete",
    };
    const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          getData();
          alert(data.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editMedicine = (e, id) => {
    e.preventDefault();
    setAddUpdateFlag(false);
    const data = {
      ID: id,
      Type: "GetByID",
    };
    const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setMedicineId(id);
          setName(data.listMedicines[0]["name"]);
          setManufacturer(data.listMedicines[0]["manufacturer"]);
          setUnitPrice(data.listMedicines[0]["unitPrice"]);
          setDiscount(data.listMedicines[0]["discount"]);
          setQuantity(data.listMedicines[0]["quantity"]);
          setExpdate(data.listMedicines[0]["expDate"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SaveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("FormFile", file);
    formdata.append("FileName", fileName);

    try {
      const res = await axios.post(`${baseUrl}/api/Admin/UploadFile`, formdata);
      console.log(res);
      if (
        res.data.statusCode === 200 &&
        res.data.statusMessage === "File uploaded"
      ) {
        // Verificăm dacă valoarea introdusă în câmpul "Quantity" este un număr întreg pozitiv mai mare ca 0
        if (!Number.isInteger(parseInt(quantity)) || parseInt(quantity) <= 0) {
          alert("Quantity must be a positive integer greater than 0");
          return;
        }

        // Verificăm dacă valoarea introdusă în câmpul "Discount" este un număr între 0 și 100
        if (
          (isNaN(parseFloat(discount)) ||
            parseFloat(discount) < 0 ||
            parseFloat(discount) > 100) &&
          discount !== ""
        ) {
          alert("Discount must be a number between 0 and 100");
          return;
        }

        // Verificăm dacă valoarea introdusă în câmpul "UnitPrice" este un număr
        if (isNaN(parseFloat(unitPrice)) ||  parseFloat(unitPrice) < 0) {
          alert("UnitPrice must be a positive number");
          return;
        }

        // Verificăm dacă valoarea introdusă în câmpul "expDate" este o dată validă și nu este mai mică sau egală cu data actuală
        const currentDate = new Date().toISOString().split("T")[0];
        if (!expdate || expdate <= currentDate) {
          alert(
            "Exp Date must be a valid date and cannot be less than or equal to the current date"
          );
          return;
        }

        const data = {
          Name: name,
          Manufacturer: manufacturer,
          UnitPrice: unitPrice,
          Discount: discount,
          Quantity: quantity,
          ExpDate: expdate,
          Status: 1,
          ImageUrl: fileName,
          Type: "Add",
        };
        const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
        axios
          .post(url, data)
          .then((result) => {
            const data = result.data;
            if (data.statusCode === 200) {
              getData();
              Clear();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const Clear = () => {
    setName("");
    setManufacturer("");
    setUnitPrice("");
    setDiscount("");
    setExpdate("");
    setFile(null);
    setFileName("");
    setQuantity("");
  };

  const updateMedicine = (e) => {
    // Verificăm dacă valoarea introdusă în câmpul "Quantity" este un număr întreg pozitiv mai mare ca 0
    if (!Number.isInteger(parseInt(quantity)) || parseInt(quantity) <= 0) {
      alert("Quantity must be a positive integer greater than 0");
      return;
    }

    // Verificăm dacă valoarea introdusă în câmpul "Discount" este un număr între 0 și 100
    if (
      (isNaN(parseFloat(discount)) ||
        parseFloat(discount) < 0 ||
        parseFloat(discount) > 100) &&
      discount !== ""
    ) {
      alert("Discount must be a number between 0 and 100");
      return;
    }

    // Verificăm dacă valoarea introdusă în câmpul "UnitPrice" este un număr
    if (isNaN(parseFloat(unitPrice))) {
      alert("UnitPrice must be a number");
      return;
    }

    const data = {
      ID: medicineId,
      Name: name,
      Manufacturer: manufacturer,
      UnitPrice: unitPrice,
      Discount: discount,
      Quantity: quantity,
      ExpDate: "",
      Status: 1,
      ImageUrl: "",
      Type: "Update",
    };
    const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          getData();
          Clear();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <AdminHeader />
      <br></br>
      <form>
        <div
          class="form-row"
          style={{ width: "80%", backgroundColor: "white", margin: " auto" }}
        >
          <div class="form-group col-md-12">
            <h3>Add Products</h3>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="form-control"
              required
              value={name}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Manufacturer"
              className="form-control"
              required
              value={manufacturer}
            />
          </div>

          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="validationTextarea"
              placeholder="UnitPrice"
              onChange={(e) => setUnitPrice(e.target.value)}
              required
              value={unitPrice}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              className="form-control"
              required
              value={discount}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="form-control"
              required
              value={quantity}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="date"
              onChange={(e) => setExpdate(e.target.value)}
              placeholder="Expiration Date"
              className="form-control"
              value={expdate}
              title="Expiration Date"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="file"
              onChange={(e) => SaveFile(e)}
              placeholder="Image url"
              className="form-control"
            />
          </div>
          <div className="form-group col-md-6">
            {addUpdateFlag ? (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
                onClick={(e) => uploadFile(e)}
              >
                Add
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
                onClick={(e) => updateMedicine(e)}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger"
              style={{ width: "150px" }}
              onClick={(e) => Clear(e)}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">UnitPrice</th>
              <th scope="col">Discount</th>
              <th scope="col">Quantity</th>
              <th scope="col">Exp Date</th>
              <th scope="col">Image</th>
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{val.name}</td>
                  <td>{val.manufacturer}</td>
                  <td>{val.unitPrice}</td>
                  <td>{val.discount}</td>
                  <td>{val.quantity}</td>
                  <td>{val.expDate}</td>
                  <td>
                    <img
                      src={`assets/${val.imageUrl}`}
                      style={{ width: "70px", borderRadius: "11px" }}
                    />
                  </td>
                  <td>
                    <button onClick={(e) => editMedicine(e, val.id)}>
                      Edit
                    </button>{" "}
                  </td>
                  <td>
                    <button onClick={(e) => deleteMedicine(e, val.id)}>
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
    </Fragment>
  );
}
