import { Box, Typography } from "@mui/material";
import React from "react";

const CheckOutCard = ({ item, checkOutItems }) => {
  // if()
  console.log(checkOutItems);
  console.log(item);

  return (
    <>
      {checkOutItems.map((list) => {
        if (list.name == item.name) {
          return (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                }}
              >
                <Box component={"img"} src={item.image} alt={"image"} sx={{width:"15%"}} />
                <Typography>{item.name}</Typography>
              </Box>
              <Typography>{list.qty}</Typography>
              <Typography>${Number(list.qty) * Number(item.price)}</Typography>
            </Box>
          );
        }
      })}
    </>
  );
};

export default CheckOutCard;
