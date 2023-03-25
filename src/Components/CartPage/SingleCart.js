import { Box, Button, Divider, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleCart = ({
  item,
  setReRender,
  reRender,
  totalPrice,
  setTotalPrice,
  reRenderCart,
  setReRenderCart
}) => {
  const [qty, setQty] = useState(1);

  const qtyChangeHandler = (type) => {
    if (type == "add") {
      if (qty < 5) {
        setQty(qty + 1);
        setTotalPrice(totalPrice + Number(item.price));
      }
    } else {
      if (qty > 1) {
        setQty(qty - 1);
        setTotalPrice(totalPrice - Number(item.price));
      }
    }
  };

  const deleteHandler = () => {
    let arr = JSON.parse(localStorage.getItem("cartProduct"));
    let filteredEle = arr.filter((list) => list._id != item._id);
    arr = JSON.stringify(filteredEle);
    localStorage.setItem("cartProduct", arr);
    setTotalPrice(totalPrice - qty * Number(item.price));
    setReRender(!reRender);
    setReRenderCart(!reRenderCart)
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid black",
        display: "flex",
        justifyContent: "space-between",
        padding: "1%",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={item.image}
          alt={"image"}
          sx={{ width: "40%" }}
        />
        <Typography
          sx={{
            textDecoration: "underLine",
            color: "blue",
            "&:hover": { cursor: "pointer" },
          }}
        >
          {item.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "10%",
        }}
      >
        <RemoveIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => qtyChangeHandler("minues")}
        />
        <Typography>{qty}</Typography>
        <AddIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => qtyChangeHandler("add")}
        />
      </Box>
      <Box>
        <Typography>${item.price}</Typography>
      </Box>
      <Box>
        <DeleteIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={deleteHandler}
        />
      </Box>
    </Box>
  );
};

export default SingleCart;
