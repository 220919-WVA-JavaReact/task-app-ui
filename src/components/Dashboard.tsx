import { Button, Card, CardContent, CardMedia, createTheme, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";

interface IDashboard {
  currentUser: User | undefined
}

const theme = createTheme();

function Dashboard(props: IDashboard) {

  return (
    props.currentUser ?
      <main>
        <div>
          <Container maxWidth="sm" sx={{
            bgcolor: 'background.paper',
            padding: theme.spacing(8, 0, 6)
          }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Task Application
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis aenean et tortor at risus viverra.
            </Typography>
            <div>
              <Grid container spacing={3} justifyContent="center" sx={{
                pt: 1
              }}>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main button
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary button
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Urgent task: 1
                  </Typography>
                  <Typography gutterBottom paragraph>
                    Card Content, task description.
                  </Typography>
                  <Typography align="right" sx={{
                    pr: 4
                  }}>
                    - Mark
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Heading
                  </Typography>
                  <Typography>
                    Card Content, task description.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Heading
                  </Typography>
                  <Typography>
                    Card Content, task description.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      :
      <Navigate to="/login" />
  );
}
export default Dashboard;
