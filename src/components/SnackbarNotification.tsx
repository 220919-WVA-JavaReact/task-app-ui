import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ISnackbarNotification {
    message: string,
    severity: AlertColor,
    open: boolean
}

export default function SnackbarNotification(props: ISnackbarNotification) {
    return (
        <Snackbar open={props.open} anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
            <Alert severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}