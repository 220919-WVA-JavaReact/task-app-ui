import { Box, Button, createTheme, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import TaskCard from "./TaskCard";

interface IDashboard {
  currentUser: User | undefined
}

const theme = createTheme();

function Dashboard(props: IDashboard) {

  const cards = [{
    id: 1,
    title: 'Washing the dishes',
    priority: 'URGENT',
    assignedUser: 'Mark'
  }, {
    id: 2,
    title: 'Making the bed',
    priority: 'URGENT',
    assignedUser: 'John'
  },
  {
    id: 3,
    title: 'Studying for QC',
    priority: 'URGENT',
    assignedUser: 'Sidney'
  },];

  return (
    <main>
      <Box sx={{
        boxShadow: 5,
        bgcolor: '#fafafa',
      }}>
        <Container maxWidth="sm" sx={{   
          padding: theme.spacing(8, 0, 6),

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
                  Learn more
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  <Link to="/register" style={{textDecoration: 'none'}}>Join us today</Link>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
      <Container maxWidth="md">
        <Typography variant="h4" color="textPrimary" gutterBottom sx={{ pt: 2 }}>
          Featured tasks:
        </Typography>
        <Grid container spacing={6}>
          {cards.map(card =>
            <Grid item xs={12} sm={6} md={4}>
              <TaskCard key={card.id} {...card} />
            </Grid>)}
        </Grid>
      </Container>
    </main>
  );
}
export default Dashboard;
