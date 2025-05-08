import LoginForm from "../components/forms/LoginForm"
import { useNavigate } from "react-router"
import { Box, Button, Typography } from "@mui/material"

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate("/register");
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 2
            }}
        >
            <LoginForm />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 2
                }}
            >
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Don't have an account?
                </Typography>
                <Button
                    variant="outlined"
                    onClick={handleRegisterRedirect}
                >
                    Register
                </Button>
            </Box>
        </Box>
    )
}

export default LoginPage;