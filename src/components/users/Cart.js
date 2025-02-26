import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { baseUrl } from "../constants";

export default function Cart() {
  const [data, setData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const data = {
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/Admin/cartList`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listCart);
          // Calcularea totalului
          const total = data.listCart.reduce((acc, item) => {
            return acc + item.unitPrice * item.quantity;
          }, 0);
          setTotalValue(total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRedirection = (path) => {
    window.location.href = path;
  };

  const handleRemoveToCart = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/Medicines/removeFromCart`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          getData();
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const data = {
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/Medicines/placeOrder`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          setData([]);
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <Header />
      <br></br>
      <div class="form-group col-md-12">
        <h3>Cart items</h3>
        {data && data.length ? (
          <div>
            <h4>Total Value: {totalValue}</h4>
            <button className="btn btn-primary" onClick={(e) => handlePlaceOrder(e)}>
              Place Order
            </button>
          </div>
        ) : (
          <div>
            <p>No item to display. Kindly add...</p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ padding: "10px" }}>
                <button className="btn btn-primary" onClick={() => handleRedirection("/myorders")}>
                  My Orders
                </button>
              </div>
              <div style={{ padding: "10px" }}>
                <button className="btn btn-primary" onClick={() => handleRedirection("/products")}>
                  All Products
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <div className="card-deck">
          {data && data.length > 0
            ? data.map((val, index) => {
                return (
                  <div key={index} class="col-md-3" style={{ marginBottom: "21px" }}>
                    <div class="card">
                      <img class="card-img-top" src={`assets/${val.imageUrl}`} alt="Card image" />
                      <div class="card-body">
                        <h4 class="card-title">Name: {val.medicineName}</h4>
                        <h4 class="card-title">Unit Price: {val.unitPrice}</h4>
                        <h4 class="card-title">Quantity: {val.quantity}</h4>
                        <h4 class="card-title">
                        {val.discount > 0 && `Discount: ${val.discount} %`}
                      </h4>
                        <button class="btn btn-primary" onClick={(e) => handleRemoveToCart(e, val.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </Fragment>
  );
}
