import {NavLink} from "react-router";
import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";

const pages = [
    {
        name: "Home",
        link:"/"
    },
    {
        name: "Authors",
        link:"/authors"
    },
    {
        name: "Books",
        link:"/books"
    },
    {
        name: "Genres",
        link:"/genres"
    },
    {
        name: "Reviews",
        link:"/reviews"
    }
];

const StyledNavLink = styled(NavLink)(({theme}) => ({
    textDecoration: "none",
    color: theme.palette.primary.dark,
    padding: theme.spacing(1),
    "&.active": {
        color: theme.palette.primary.light,
    },
}));

const PageNavigation: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const createLinkElements = pages.map((page) => (
        <MenuItem key={page.link}>
            <StyledNavLink to={page.link}>{page.name}</StyledNavLink>
        </MenuItem>
    ))

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <nav>
                    <Toolbar>
                        <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
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
                                    vertical:"bottom",
                                    horizontal:"left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical:"top",
                                    horizontal:"left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                            {createLinkElements}
                            </Menu>
                        </Box>
                            <Box sx={{flexGrow: 1, display: {xs: "none", md:"flex"}}}>
                            {createLinkElements}
                            </Box>
                    </Toolbar>
                </nav>
            </Container>
        </AppBar>
    )
}

export default PageNavigation;