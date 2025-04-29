import PageNavigation from "./PageNavigation.tsx";
import {Outlet, useLocation, NavLink} from "react-router";
import Box from "@mui/material/Box";
import {Breadcrumbs, Typography} from "@mui/material";
import MuiLink from "@mui/material/Link";

const Layout: React.FC = () => {
    const location = useLocation();

    const pathname = location.pathname.split("/").filter((x) => x);

    return (
        <>
            <PageNavigation/>
            <Box sx={{p: 2}}>
                <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
                    <MuiLink
                        component={NavLink}
                        to="/"
                        underline="hover"
                        color="inherit"
                    >
                        Home
                    </MuiLink>
                    {pathname.map((value, index) => {
                        const to = `/${pathname.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathname.length -1;
                        return isLast ? (
                            <Typography key={to} color="text.primary">
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            {/*TODO one thing breadcrumb appears as a number e.g breadcrumb in Harry Potter book page apperas as Home/ Books /1, need to change 1 to the name of book. */}
                            </Typography>
                        ) : (
                            <MuiLink
                                key={to}
                                component={NavLink}
                                to={to}
                                underline="hover"
                                color="inherit"
                            >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </MuiLink>
                        )
                    })}
                </Breadcrumbs>
            </Box>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;