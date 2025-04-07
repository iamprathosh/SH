from app.models.candidate import Candidate
from app.ml.deberta import DeBERTaModel

class CandidateService:
    def __init__(self):
        self.model = DeBERTaModel()

    def assess_candidate(self, candidate: Candidate):
        resume_text = candidate.extract_resume_text()
        interview_analysis = candidate.analyze_interview_responses()
        
        # Perform assessment using DeBERTa model
        assessment_result = self.model.assess(resume_text, interview_analysis)
        
        return assessment_result

    def add_candidate(self, name, resume, interview_responses):
        candidate = Candidate(name=name, resume=resume, interview_responses=interview_responses)
        db.session.add(candidate)
        db.session.commit()
        return candidate

    def update_candidate(self, id, name=None, resume=None, interview_responses=None):
        candidate = Candidate.query.get_or_404(id)
        if name:
            candidate.name = name
        if resume:
            candidate.resume = resume
        if interview_responses:
            candidate.interview_responses = interview_responses
        db.session.commit()
        return candidate

    def get_candidate(self, id):
        return Candidate.query.get_or_404(id)
