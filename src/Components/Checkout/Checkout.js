import {
  Box,
  Button,
  Divider,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import CheckOutCard from "./CheckOutCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(50);
  const [option, setOption] = useState("shipping");
  const [shippingValues, setShippingValues] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });
  const [payMethod, setPayMethod] = useState("paypal");
  const [cartProduct, setCartProduct] = useState([]);
  const [checkOutItems, setCheckOutItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const continueHandler = () => {
    setPercentage(75);
    setOption("payment");
  };

  const changePaymentMethod = (type) => {
    setPayMethod(type);
    setPercentage(100);
    setOption("placeOrder");
  };

  const addressEditHandler = () => {
    setOption("shipping");
    setPercentage(50);
  };

  const paymentEditHandler = () => {
    setOption("payment");
    setPercentage(75);
  };

  useEffect(() => {
    if (localStorage.getItem("cartProduct") == null) {
      setCartProduct([]);
    } else {
      let arr = JSON.parse(localStorage.getItem("cartProduct"));
      let checkPro = JSON.parse(localStorage.getItem("checkoutItem"));
      console.log(checkPro);
      let totalPrice = checkPro.reduce(
        (acc, cur) => acc + Number(cur.price.substr(1)),
        0
      );
      setTotalAmount(totalPrice);
      setCartProduct(arr);
      setCheckOutItems(checkPro);
    }
  }, []);

  const submitHandler = async () => {
    let options = {
      url: "http://localhost:7000/orders",
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      data: {
        cartItem: cartProduct,
        checkOutItem: checkOutItems,
        paymentMethod: payMethod,
        address: shippingValues,
        totalAmount: totalAmount,
      },
    };

    try {
      let response = await axios(options);
      console.log(response);

      if (response.status == 200) {
        if (response.data.msg == "inserted") {
          alert("Order PLaced Successfull");
          navigate("/");
        } else {
          alert(response.data.msg);
          navigate("/");
          return;
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <Header />
      <Box sx={{ paddingX: "5%", width: "90%", display: "flex" }}>
        <Typography
          sx={{
            width: "25%",
            borderBottom:
              percentage >= 25 ? "5px solid rgb(240,128,0)" : "5px solid grey",
            color: "rgb(240,128,0)",
            fontSize: "20px",
            "&:hover": { cursor: "pointer" },
          }}
        >
          Sign in
        </Typography>
        <Typography
          sx={{
            width: "25%",
            borderBottom:
              percentage >= 50 ? "5px solid rgb(240,128,0)" : "5px solid grey",
            color: "rgb(240,128,0)",
            fontSize: "20px",
            "&:hover": { cursor: "pointer" },
          }}
        >
          Shipping
        </Typography>
        <Typography
          sx={{
            width: "25%",
            borderBottom:
              percentage >= 75 ? "5px solid rgb(240,128,0)" : "5px solid grey",
            color: "rgb(240,128,0)",
            fontSize: "20px",
            "&:hover": { cursor: "pointer" },
          }}
        >
          Payment
        </Typography>
        <Typography
          sx={{
            width: "25%",
            borderBottom:
              percentage >= 100 ? "5px solid rgb(240,128,0)" : "5px solid grey",
            color: "rgb(240,128,0)",
            fontSize: "20px",
            "&:hover": { cursor: "pointer" },
          }}
        >
          Place Order
        </Typography>
      </Box>

      {/* address box */}
      {option == "shipping" ? (
        <Box
          sx={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
            Shipping Address
          </Typography>
          <Box>
            <Typography>Full Name</Typography>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              value={shippingValues.name}
              onChange={(e) =>
                setShippingValues({ ...shippingValues, name: e.target.value })
              }
            />
          </Box>
          <Box>
            <Typography>Address</Typography>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={shippingValues.address}
              onChange={(e) =>
                setShippingValues({
                  ...shippingValues,
                  address: e.target.value,
                })
              }
            />
          </Box>
          <Box>
            <Typography>City</Typography>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={shippingValues.city}
              onChange={(e) =>
                setShippingValues({ ...shippingValues, city: e.target.value })
              }
            />
          </Box>
          <Box>
            <Typography>Postal Code</Typography>
            <TextField
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              value={shippingValues.postal}
              onChange={(e) =>
                setShippingValues({ ...shippingValues, postal: e.target.value })
              }
            />
          </Box>
          <Box>
            <Typography>Country</Typography>
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              value={shippingValues.country}
              onChange={(e) =>
                setShippingValues({
                  ...shippingValues,
                  country: e.target.value,
                })
              }
            />
          </Box>
          <Button variant="contained" onClick={continueHandler}>
            Continue
          </Button>
        </Box>
      ) : option == "payment" ? (
        <Box
          sx={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
            Payment Method
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
              checked={payMethod == "paypal" ? true : false}
              onChange={() => changePaymentMethod("paypal")}
            />
            <Typography>PayPal</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
              checked={payMethod == "stripe" ? true : false}
              onChange={() => changePaymentMethod("stripe")}
            />
            <Typography>Stripe</Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
            paddingX: "5%",
          }}
        >
          <Typography sx={{ fontSize: "26px", fontWeight: "bold" }}>
            Preview Order
          </Typography>
          <Box sx={{ width: "100%", display: "flex", columnGap: "20px" }}>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                rowGap: "30px",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid grey",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                  padding: "2%",
                  borderRadius: "20px",
                }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  Shipping
                </Typography>
                <Box sx={{ display: "flex", columnGap: "5px" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    Name:
                  </Typography>
                  <Typography>{shippingValues.name}</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "5px" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    Address:
                  </Typography>
                  <Typography>{shippingValues.address}</Typography>
                </Box>
                <Typography
                  sx={{
                    color: "blue",
                    textDecoration: "underLine",
                    "&:hover": { cursor: "pointer" },
                  }}
                  onClick={addressEditHandler}
                >
                  Edit
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid grey",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                  padding: "2%",
                  borderRadius: "20px",
                }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  Payment
                </Typography>
                <Box sx={{ display: "flex", columnGap: "5px" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    Method:
                  </Typography>
                  <Typography>{payMethod}</Typography>
                </Box>
                <Typography
                  sx={{
                    color: "blue",
                    textDecoration: "underLine",
                    "&:hover": { cursor: "pointer" },
                  }}
                  onClick={paymentEditHandler}
                >
                  Edit
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid grey",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                  padding: "2%",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  items
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                    borderRadius: "20px",
                  }}
                >
                  {cartProduct.map((item, index) => {
                    return (
                      <CheckOutCard
                        key={index}
                        item={item}
                        checkOutItems={checkOutItems}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "30%",
                border: "1px solid grey",
                padding: "1%",
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                borderRadius: "20px",
                height: "fit-content",
              }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Order Summary
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  padding: "1%",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: "5%",
                  }}
                >
                  <Typography>items</Typography>
                  <Typography>${totalAmount}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: "5%",
                  }}
                >
                  <Typography>Shipping</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: "5%",
                  }}
                >
                  <Typography>Tax</Typography>
                  <Typography>$18.00</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: "5%",
                  }}
                >
                  <Typography>Order Total</Typography>
                  <Typography>${totalAmount + 18}</Typography>
                </Box>
                <Divider />
                <Button variant="contained" onClick={submitHandler}>
                  Place Order
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Checkout;
