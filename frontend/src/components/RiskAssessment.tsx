import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';

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

const RiskAssessment: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Risk Assessment
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Risk Metric 1</Typography>
            {/* Add risk metric 1 details here */}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Risk Metric 2</Typography>
            {/* Add risk metric 2 details here */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RiskAssessment;
