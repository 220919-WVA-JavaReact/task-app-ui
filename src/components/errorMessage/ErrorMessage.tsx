import { Alert, Box, Stack } from "@mui/material";

interface IErrorMessageProps {
    message: string
}

function ErrorMessage(props: IErrorMessageProps) {

    return (
        <Box sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Alert sx={{ width: '100%' }} severity="error">{props.message}</Alert>
        </Box>
    );
}

export default ErrorMessage;