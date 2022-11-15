import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ITaskCard {
    id: number,
    title: string,
    priority: string,
    assignedUser: string
}

export default function TaskCard(props: ITaskCard) {

    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                image="https://source.unsplash.com/random"
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {props.title}
                </Typography>
                <Typography gutterBottom paragraph>
                    Priority: {props.priority}
                </Typography>
                <Typography align="right" sx={{
                    pr: 4
                }}>
                    - {props.assignedUser}
                </Typography>
            </CardContent>
        </Card>
    );
}