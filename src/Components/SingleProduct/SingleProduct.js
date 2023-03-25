import { Box, Button, Divider, Rating, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";

const SingleProduct = () => {
  const { name } = useParams();
  const [prodDetails, setProdDetails] = useState("");
  const [reRenderCart, setReRenderCart] = useState(false);


  const getSinleProductDetails = async () => {
    let options = {
      url: `http://localhost:7000/product/singleProduct/${name}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };
    try {
      let response = await axios(options);
      console.log(response);
      if (response.status == 200) {
        if (response.data.msg == "fetched single Product Successfully") {
          setProdDetails(response.data.allData[0]);
        }
      }
    } catch (err) {}
  };

  const addToCart = () => {
    if (localStorage.getItem("cartProduct") == null) {
      let arr = [prodDetails];
      arr = JSON.stringify(arr);
      localStorage.setItem("cartProduct", arr);
      setReRenderCart(!reRenderCart);
    } else {
      let arr = JSON.parse(localStorage.getItem("cartProduct"));
      let filterEle = arr.filter((list) => list._id == prodDetails._id);
      if (filterEle.length) {
      } else {
        arr.push(prodDetails);
        arr = JSON.stringify(arr);
        localStorage.setItem("cartProduct", arr);
        setReRenderCart(!reRenderCart);
      }
    }
  };

  useEffect(() => {
    getSinleProductDetails();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <Header reRenderCart={reRenderCart}/>
      <Box>
        <Box>
          {prodDetails == "" ? null : (
            <Box
              sx={{
                width: "93%",
                paddingLeft: "50px",
                paddingRight: "50px",
                display: "flex",
                columnGap: "30px",
              }}
            >
              <Box sx={{ width: "40%" }}>
                <Box
                  component={"img"}
                  src={prodDetails.image}
                  alt={"img"}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                  columnGap: "30px",
                }}
              >
                <Box
                  sx={{
                    width: "68%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <Typography sx={{ fontSize: "30px" }}>
                    {prodDetails.name.toUpperCase()}
                  </Typography>
                  <Divider />
                  <Rating
                    name="read-only"
                    value={prodDetails.ratings}
                    readOnly
                  />
                  <Divider />
                  <Typography>Price : ${prodDetails.price}</Typography>
                  <Divider />
                  <Box
                    component={"img"}
                    src={prodDetails.image}
                    alt={"mage"}
                    sx={{ width: "30%" }}
                  />
                  <Divider />
                  <Typography>Description:</Typography>
                  <Typography>{prodDetails.desc.substr(0, 20)}</Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid grey",
                    padding: "20px",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                    height: "20vh",
                    borderRadius: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Price:</Typography>
                    <Typography>{prodDetails.price}</Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Status:</Typography>
                    {prodDetails.qty == 0 ? (
                      <Typography
                        sx={{
                          paddingRight: "10px",
                          paddingLeft: "10px",
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "10px",
                        }}
                      >
                        Out of Stock
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          paddingRight: "10px",
                          paddingLeft: "10px",
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "10px",
                        }}
                      >
                        In Stock
                      </Typography>
                    )}
                  </Box>
                  <Divider />
                  {prodDetails.qty == 0 ? null : (
                    <Button variant="contained" onClick={addToCart}>Add To Cart</Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleProduct;
