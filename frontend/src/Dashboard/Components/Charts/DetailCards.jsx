import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailIcon from '@mui/icons-material/Mail';


const DashboardCard = ({ icon, title, value, change, bgColor }) => {
  return (
    <Card sx={{ bgcolor: bgColor, borderRadius: 3, color: 'white' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>{icon}</Grid>
          <Grid item xs>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {change > 0 ? `+${change}%` : `${change}%`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function DetailCards() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          icon={<ShoppingBagIcon fontSize="large" />}
          title="Weekly Sales"
          value="714k"
          change={2.6}
          bgColor="#1877F2"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          icon={<PersonIcon fontSize="large" />}
          title="New Users"
          value="1.35m"
          change={-0.1}
          bgColor="#8E33FF"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          icon={<ShoppingCartIcon fontSize="large" />}
          title="Purchase Orders"
          value="1.72m"
          change={2.8}
          bgColor="#FFAB00"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          icon={<MailIcon fontSize="large" />}
          title="Messages"
          value="234"
          change={3.6}
          bgColor="#FFF530"
        />
      </Grid>
    </Grid>
  );
}