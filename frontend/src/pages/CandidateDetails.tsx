import React from 'react';
import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CandidateComparison from '../components/CandidateComparison';
import RiskAssessment from '../components/RiskAssessment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CandidateDetails: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleComparisonClick = () => {
    history.push('/candidate-comparison');
  };

  const handleRiskAssessmentClick = () => {
    history.push('/risk-assessment');
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Candidate Details
      </Typography>
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
      <CandidateComparison />
      <RiskAssessment />
    </Container>
  );
};

export default CandidateDetails;
