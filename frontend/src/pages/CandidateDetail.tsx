import React from 'react';
import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useCandidateContext } from '../context/CandidateContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CandidateDetail: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { getCandidate } = useCandidateContext();
  const candidate = getCandidate(id);

  if (!candidate) {
    return <Typography variant="h6">Candidate not found</Typography>;
  }

  const handleComparisonClick = () => {
    history.push('/candidate-comparison');
  };

  const handleRiskAssessmentClick = () => {
    history.push('/risk-assessment');
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {candidate.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Resume:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {candidate.resume}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Interview Responses:
      </Typography>
      {candidate.interviewResponses.map((response, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          {response}
        </Typography>
      ))}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleComparisonClick}
      >
        Compare Candidates
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleRiskAssessmentClick}
      >
        Assess Risk
      </Button>
    </Container>
  );
};

export default CandidateDetail;
