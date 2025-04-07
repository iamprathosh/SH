import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useCandidateContext } from '../context/CandidateContext';

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
  button: {
    margin: theme.spacing(1),
  },
}));

const CandidateList: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { candidates } = useCandidateContext();

  const handleViewDetails = (id: string) => {
    history.push(`/candidates/${id}`);
  };

  const handleCompareCandidates = () => {
    history.push('/candidate-comparison');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Candidate List
          </Typography>
        </Grid>
        {candidates.map((candidate) => (
          <Grid item xs={12} key={candidate.id}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{candidate.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleViewDetails(candidate.id)}
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleCompareCandidates}
          >
            Compare Candidates
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateList;
