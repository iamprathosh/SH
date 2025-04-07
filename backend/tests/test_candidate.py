import pytest
from app import app, db
from app.models.candidate import Candidate

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_add_candidate(client):
    response = client.post('/api/candidates', json={
        'name': 'John Doe',
        'resume': 'Resume content',
        'interview_responses': ['Response 1']
    })
    assert response.status_code == 201
    assert response.get_json()['msg'] == 'Candidate added successfully'

def test_update_candidate(client):
    candidate = Candidate(name='John Doe', resume='Resume content', interview_responses=['Response 1'])
    db.session.add(candidate)
    db.session.commit()

    response = client.put(f'/api/candidates/{candidate.id}', json={
        'name': 'John Doe Updated',
        'resume': 'Updated resume content',
        'interview_responses': ['Updated Response 1']
    })
    assert response.status_code == 200
    assert response.get_json()['msg'] == 'Candidate updated successfully'

def test_get_candidate(client):
    candidate = Candidate(name='John Doe', resume='Resume content', interview_responses=['Response 1'])
    db.session.add(candidate)
    db.session.commit()

    response = client.get(f'/api/candidates/{candidate.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert data['name'] == 'John Doe'
    assert data['resume'] == 'Resume content'
    assert data['interview_responses'] == ['Response 1']

def test_assess_candidate(client):
    candidate = Candidate(name='John Doe', resume='Resume content', interview_responses=['Response 1'])
    db.session.add(candidate)
    db.session.commit()

    response = client.post(f'/api/candidates/{candidate.id}/assess')
    assert response.status_code == 200
    assert 'assessment_result' in response.get_json()
