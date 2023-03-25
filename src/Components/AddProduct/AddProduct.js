import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../Header/Header";
import axios from "axios";

const AddProduct = () => {
  const [inValue, setInValue] = useState({
    name: "",
    price: "",
    qty: "",
    desc: "",
    image: "",
    ratings: "",
  });

  const submitHandler = async () => {
    let options = {
      url: "http://localhost:7000/product/",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: inValue,
    };

    try {
      let response = await axios(options);
      console.log(response)
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box>
      <Header />
      <Typography>AddProduct</Typography>
      <Box>
        <Box>
          <Typography>Image</Typography>
          <TextField
            id="outlined-basic"
            label="Image"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={inValue.image}
            onChange={(e) => setInValue({ ...inValue, image: e.target.value })}
          />
        </Box>
        <Box>
          <Typography>Name</Typography>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={inValue.name}
            onChange={(e) => setInValue({ ...inValue, name: e.target.value })}
          />
        </Box>
        <Box>
          <Typography>Price</Typography>
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={inValue.price}
            onChange={(e) => setInValue({ ...inValue, price: e.target.value })}
          />
        </Box>
        <Box>
          <Typography>Ratings</Typography>
          <TextField
            id="outlined-basic"
            label="Ratings"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={inValue.ratings}
            onChange={(e) =>
              setInValue({ ...inValue, ratings: e.target.value })
            }
          />
        </Box>
        <Box>
          <Typography>Quantity</Typography>
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={inValue.qty}
            onChange={(e) => setInValue({ ...inValue, qty: e.target.value })}
          />
        </Box>
        <Box>
          <Typography>Description</Typography>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={inValue.desc}
            onChange={(e) => setInValue({ ...inValue, desc: e.target.value })}
          />
        </Box>
        <Button variant="contained" onClick={submitHandler}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
