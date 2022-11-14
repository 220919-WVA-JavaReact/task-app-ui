import { Box, Container, CssBaseline, Typography } from "@mui/material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            220919-Java/React{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.primary.main
                        : theme.palette.primary.main,
            }}
        >
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </Box>
    );
}