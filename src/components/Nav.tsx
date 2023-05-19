import React from "react";
import {
   Avatar,
   AppBar,
   Toolbar,
   Typography,
   IconButton,
   MenuItem,
   Menu,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function MenuAppBar() {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <AppBar
         sx={{
            position: "static",
            bgcolor: "transparent",
            padding: "30px",
         }}
         elevation={0}
      >
         <Toolbar>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
            >
               <AdminPanelSettingsIcon
                  fontSize="large"
                  sx={{ color: "black" }}
               />
            </IconButton>
            <Typography
               variant="h6"
               component="div"
               sx={{ flexGrow: 1, color: "black" }}
            >
               Student Administration
            </Typography>

            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleMenu}
               color="inherit"
            >
               <Avatar alt="Remy Sharp" src="/pic1.png" />
            </IconButton>
            <Menu
               id="menu-appbar"
               anchorEl={anchorEl}
               anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
               }}
               keepMounted
               transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
               }}
               open={Boolean(anchorEl)}
               onClose={handleClose}
            >
               <MenuItem onClick={handleClose}>Profile</MenuItem>
               <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
         </Toolbar>
      </AppBar>
   );
}
