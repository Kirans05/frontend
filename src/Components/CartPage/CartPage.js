import { Box, Button, Divider, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SingleCart from "./SingleCart";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [reRender, setReRender] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const prodRef = useRef();
  const [reRenderCart, setReRenderCart] = useState(true)

  const checkOut = () => {
    let a = prodRef.current.outerText.split("\n")
    console.log(a)
    let arr = []
    let obj = {}
    for(let i=0; i<a.length; i++){
      if(a[i].startsWith("shirt")){
        obj.name = a[i]
      }else if(a[i] == ""){

      }else if(a[i].startsWith("$")){
        obj.price = a[i]
        arr.push(obj)
        obj = {}
      }else{
        obj.qty = a[i]
      }
    }
    localStorage.setItem("checkoutItem", JSON.stringify(arr))
    navigate("/Checkout")
  }

  useEffect(() => {
    if (localStorage.getItem("cartProduct") == null) {
      setCart([]);
    } else {
      let arr = JSON.parse(localStorage.getItem("cartProduct"));
      setCart(arr);
      let totalAmount = arr.reduce((acc, item) => acc + Number(item.price), 0);
      setTotalPrice(totalAmount);
    }
  }, [reRender]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Header reRenderCart={reRenderCart}/>
      <Typography
        sx={{ fontSize: "25px", fontWeight: "bold", paddingLeft: "50px" }}
      >
        Shopping Cart
      </Typography>
      <Box
        sx={{
          paddingLeft: "50px",
          paddingRight: "50px",
          width: "93%",
          display: "flex",
          columnGap: "10px",
        }}
      >
        <Box
          sx={{
            width: "75%",
          }}
        >
          {cart.length == 0 ? (
            <Box
              sx={{
                backgroundColor: "rgb(207,244,252)",
                paddingLeft: "20px",
                width: "97%",
                display: "flex",
                columnGap: "2px",
                paddingY: "10px",
                borderRadius: "10px",
              }}
            >
              <Typography>Cart is empty,</Typography>
              <Typography
                sx={{
                  textDecoration: "underLine",
                  color: "blue",
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => navigate("/")}
              >
                Go Shopping
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: "97%",
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
              }}
              ref={prodRef}
            >
              {cart.map((item, index) => {
                return (
                  <SingleCart
                    key={index}
                    item={item}
                    reRender={reRender}
                    setReRender={setReRender}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice}
                    setReRenderCart={setReRenderCart}
                    reRenderCart={reRenderCart}
                  />
                );
              })}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid grey",
            padding: "2%",
            rowGap: "10px",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
              Subtotal (0 items) :
            </Typography>
            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
              ${totalPrice}
            </Typography>
          </Box>
          <Divider />
          <Button variant="contained" onClick={checkOut}>
            Proceed To CheckOut
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
