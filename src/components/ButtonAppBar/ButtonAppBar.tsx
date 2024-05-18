import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LogOutTC } from "../../state/auth-reducer";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const logOut = () => {
    dispatch(LogOutTC())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {isLoggedIn && <Button onClick={logOut} color="inherit" sx={{ marginLeft: "auto" }}>Log out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}