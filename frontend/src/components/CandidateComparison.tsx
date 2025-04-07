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

const CandidateComparison: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Candidate Comparison
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Candidate 1</Typography>
            {/* Add candidate 1 details here */}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Candidate 2</Typography>
            {/* Add candidate 2 details here */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateComparison;
