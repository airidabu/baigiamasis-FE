import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Button, Switch } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const publicPages = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Books",
        link: "/books"
    },
    {
        name: "Genres",
        link: "/genres"
    },
    {
        name: "Reviews",
        link: "/reviews"
    },
    {
        name: "Publishers",
        link: "/publishers"
    }
];

const authPages = [
    {
        name: "Dashboard",
        link: "/dashboard"
    }
];

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.dark,
    padding: theme.spacing(1),
    "&.active": {
        color: theme.palette.primary.light,
    },
}));

const PageNavigation: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const { themeMode, toggleTheme } = useThemeContext();
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const pages = [...publicPages, ...(isAuthenticated ? authPages : [])];

    const createLinkElements = pages.map((page) => (
        <MenuItem
            component={StyledNavLink}
            to={page.link}
            key={page.link}
        >
            {page.name}
        </MenuItem>
    ))

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <nav>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="open menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-apbar"
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
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {createLinkElements}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {createLinkElements}
                        </Box>
                        <Box>
                            {isAuthenticated ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleLogout}
                                >
                                    Logout {user?.name ? `${user.name}` : ""}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={StyledNavLink}
                                    to="/login"
                                >
                                    Login / Register
                                </Button>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            <LightModeIcon fontSize="small" />
                            <Switch
                                checked={themeMode === "dark"}
                                onChange={toggleTheme}
                                aria-label="Change theme"
                                size="small"
                            />
                            <DarkModeIcon fontSize="small" />
                        </Box>
                    </Toolbar>
                </nav>
            </Container>
        </AppBar>
    )
}

export default PageNavigation;