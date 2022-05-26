import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from "react-router-dom";
import {useTokenStore} from "../store";
import SellIcon from '@mui/icons-material/Sell';
import LoginIcon from '@mui/icons-material/Login';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const token = useTokenStore(state => state.token)
    // Credit for opening and closing profile bar to https://mui.com/material-ui/react-app-bar/
    const[open,setOpen] = React.useState(false);


    //Get user photo
    const getUserImage = () => {
        //Check if token null
        if (token === null) {
            return ""
        }else{
            return "http://localhost:4941/api/v1/users/"+token.userId+"/image"
        }
        // @ts-ignore

    }
    //Diff nav bar for being logged out
    if(token === null){
        return(
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*Menu Items*/}
                        <SellIcon />
                        {/*TODO Make icons come from right side and make logo larger */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex-end' } }}>
                            <Button href={'/auctions'} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Auctions
                            </Button>
                            <Button href={'/create'} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Create
                            </Button>
                            <Button href={'/myAuctions'} sx={{ my: 2, color: 'white', display: 'block' }}>
                                My Auctions
                            </Button>
                        </Box>

                        {/*User Profile Menu Items*/}
                        {/*Credit for the bar to MUI docs https://mui.com/material-ui/react-app-bar/*/}
                        <Box>
                            <IconButton href={"/login"}  >
                                <LoginIcon style={{ color: 'white' }} />
                            </IconButton>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*Menu Items*/}
                    <SellIcon />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button href={'/auctions'} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Auctions
                            </Button>
                        <Button href={'/create'} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Create
                        </Button>
                        <Button href={'/myAuctions'} sx={{ my: 2, color: 'white', display: 'block' }}>
                            My Auctions
                        </Button>
                    </Box>

                    {/*User Profile Menu Items*/}
                    {/*Credit for the bar to MUI docs https://mui.com/material-ui/react-app-bar/*/}
                    <Box>
                            <IconButton onClick={()=>setOpen(true)} >
                                <Avatar src={getUserImage()}/>
                            </IconButton>
                        <Menu
                            keepMounted
                            sx={{mt:'35px'}}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(open)}
                            onClose={() => {setOpen(false)}}
                        >
                            {/*Credit for menu links to https://stackoverflow.com/a/49019285*/}
                            <MenuItem component={Link} to="/profile">
                                Profile
                            </MenuItem>
                            <MenuItem component={Link} to="/edit_profile">
                                Edit Profile
                            </MenuItem>
                            <MenuItem component={Link} to="/edit_photo">
                                Edit Photo
                            </MenuItem>
                            <MenuItem component={Link} to="/logout">
                                Log Out
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;