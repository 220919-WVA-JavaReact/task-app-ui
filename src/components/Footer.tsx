import { Box, Container, Typography } from "@mui/material";

export default function Footer(props: any) {
    return (
        <Box component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto'
            }}>
            <Container component="main" maxWidth="xs">
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    220919-Java/React{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}