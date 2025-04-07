import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import CandidateComparison from './CandidateComparison';
import RiskAssessment from './RiskAssessment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} data-testid="candidate-comparison">
          <Paper className={classes.paper}>
            <CandidateComparison />
          </Paper>
        </Grid>
        <Grid item xs={12} data-testid="risk-assessment">
          <Paper className={classes.paper}>
            <RiskAssessment />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
