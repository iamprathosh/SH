import pytest
from app import app, db
from app.models.user import User

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

def test_register(client):
    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword',
        'role': 'user'
    })
    assert response.status_code == 201
    assert response.get_json()['msg'] == 'User registered successfully'

def test_register_existing_user(client):
    user = User(username='testuser', role='user')
    user.set_password('testpassword')
    db.session.add(user)
    db.session.commit()

    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword',
        'role': 'user'
    })
    assert response.status_code == 400
    assert response.get_json()['msg'] == 'Username already exists'

def test_login(client):
    user = User(username='testuser', role='user')
    user.set_password('testpassword')
    db.session.add(user)
    db.session.commit()

    response = client.post('/api/auth/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 200
    assert 'access_token' in response.get_json()

def test_login_invalid_user(client):
    response = client.post('/api/auth/login', json={
        'username': 'invaliduser',
        'password': 'invalidpassword'
    })
    assert response.status_code == 401
    assert response.get_json()['msg'] == 'Invalid username or password'
