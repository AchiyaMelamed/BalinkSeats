import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import BalinkSvgIconComponent from "../Icon/BalinkSvgIcon/BalinkSvgIcon.component";
import { useAppSelector } from "../../store/features/store";

function ResponsiveAppBar({ pages, actions }: any) {
  const navigate = useNavigate();
  const [signedUser] = useAppSelector((state) => [state.signed.signedUser]);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  type typeOfPage = {
    path: string;
    name: string;
    element: JSX.Element;
    display: boolean;
  };
  type typeOfAction = {
    name: string;
    onClick: () => void;
    navigateTo: any;
    display: boolean;
  };

  const displayPages = pages.filter((page: typeOfPage) => page.display);
  const displayActions = actions.filter(
    (action: typeOfAction) => action.display
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page: typeOfPage) => {
    navigate(page.path);
  };

  return (
    <AppBar position="sticky" style={{ background: "#622f8d", opacity: "0.9" }}>
      <Container maxWidth="xl" style={{ maxHeight: "10vh" }}>
        <Toolbar disableGutters style={{ minHeight: "3.5rem" }}>
          <BalinkSvgIconComponent />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              userSelect: "none",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BalinkSeats
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {displayPages.map((page: typeOfPage) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="#a57ce1">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BalinkSvgIconComponent
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              minWidth: "2.5rem",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              userSelect: "none",
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BalinkSeats
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {displayPages.map((page: typeOfPage) => (
              <Button
                key={page.path}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: "white", display: "block", margin: 0 }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={signedUser?.name || "Please Sign In"}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, display: "flex", flexDirection: "column" }}
              >
                <Avatar
                  alt={signedUser.name}
                  sx={{
                    border: "2px solid",
                    borderColor:
                      signedUser.level === "Admin" ? "orange !important" : null,
                    width: "2rem",
                    height: "2rem",
                  }}
                >
                  {signedUser?.name[0]}
                </Avatar>
                {signedUser?.level === "Admin" && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "orange",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Admin
                  </Typography>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={displayActions.length > 0 && Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {displayActions?.length > 0 &&
                displayActions.map((action: typeOfAction) => (
                  <MenuItem
                    key={action.name}
                    onClick={() => {
                      action.onClick();
                      navigate(action.navigateTo);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center" color="#a57ce1">
                      {action.name}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
