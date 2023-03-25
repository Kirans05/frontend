import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ reRenderCart }) => {
  const [userExist, setUserExist] = useState(false);
  const [userData, setUserData] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography>DRawer</Typography>
    </Box>
  );

  useEffect(() => {
    if (localStorage.getItem("userToken") == null) {
      setUserExist(false);
    } else {
      setUserExist(true);
      setUserData(JSON.parse(localStorage.getItem("userDetails")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("cartProduct") == null) {
      setCartCount(0);
    } else {
      let arr = JSON.parse(localStorage.getItem("cartProduct"));
      setCartCount(arr.length);
    }
  }, [reRenderCart]);

  return (
    <Box
      sx={{
        display: "flex",
        border: "2px solid black",
        alignItems: "center",
        paddingLeft: "150px",
        paddingRight: "150px",
        justifyContent: "space-between",
        backgroundColor: "black",
        color: "white",
      }}
    >
      {/* left part */}
      <Box sx={{ display: "flex", columnGap: "20px", alignItems: "center" }}>
        <MenuIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={toggleDrawer("left", true)}
        />
        <Typography
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => navigate("/")}
        >
          amazona
        </Typography>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ backgroundColor: "white" }}
        />
      </Box>

      {/* right part */}
      <Box sx={{ display: "flex", columnGap: "30px", alignItems: "center" }}>
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => navigate("/CartPage")}
          >
            Cart
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "-12px",
              top: "-8px",
              color: "red",
            }}
          >
            {cartCount}
          </Typography>
        </Box>
        {userExist == true ? (
          <Typography sx={{ "&:hover": { cursor: "pointer" } }}>
            {userData == "" ? "User Name" : userData[0].name}
          </Typography>
        ) : (
          <Typography
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => navigate("/LoginPage")}
          >
            Sign In
          </Typography>
        )}
      </Box>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Box>
  );
};

export default Header;
