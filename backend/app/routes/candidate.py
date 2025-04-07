from flask import Blueprint, request, jsonify
from app.models.candidate import Candidate, db
from app.services.candidate_service import CandidateService

candidate_bp = Blueprint('candidate', __name__)
candidate_service = CandidateService()

@candidate_bp.route('/candidates', methods=['POST'])
def add_candidate():
    data = request.get_json()
    name = data.get('name')
    resume = data.get('resume')
    interview_responses = data.get('interview_responses')

    if not name or not resume:
        return jsonify({"msg": "Missing name or resume"}), 400

    candidate = Candidate(name=name, resume=resume, interview_responses=interview_responses)
    db.session.add(candidate)
    db.session.commit()

    return jsonify({"msg": "Candidate added successfully"}), 201

@candidate_bp.route('/candidates/<int:id>', methods=['PUT'])
def update_candidate(id):
    data = request.get_json()
    candidate = Candidate.query.get_or_404(id)

    candidate.name = data.get('name', candidate.name)
    candidate.resume = data.get('resume', candidate.resume)
    candidate.interview_responses = data.get('interview_responses', candidate.interview_responses)

    db.session.commit()

    return jsonify({"msg": "Candidate updated successfully"}), 200

@candidate_bp.route('/candidates/<int:id>', methods=['GET'])
def get_candidate(id):
    candidate = Candidate.query.get_or_404(id)
    return jsonify({
        "id": candidate.id,
        "name": candidate.name,
        "resume": candidate.resume,
        "interview_responses": candidate.interview_responses
    }), 200

@candidate_bp.route('/candidates/<int:id>/assess', methods=['POST'])
def assess_candidate(id):
    candidate = Candidate.query.get_or_404(id)
    assessment_result = candidate_service.assess_candidate(candidate)
    return jsonify(assessment_result), 200
