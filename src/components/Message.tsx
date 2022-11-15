import { Alert, AlertColor, Box } from "@mui/material";

interface IMessageProps {
    message: string,
    severity: AlertColor
}

function Message(props: IMessageProps) {

    return (
        <Box sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Alert sx={{ width: '100%' }} severity={props.severity}>{props.message}</Alert>
        </Box>
    );
}

export default Message;