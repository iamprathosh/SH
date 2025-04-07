from flask_jwt_extended import create_access_token
from app.models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash

class AuthService:
    def register_user(self, username, password, role):
        if User.query.filter_by(username=username).first():
            return {"msg": "Username already exists"}, 400

        user = User(username=username, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return {"msg": "User registered successfully"}, 201

    def login_user(self, username, password):
        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return {"msg": "Invalid username or password"}, 401

        access_token = create_access_token(identity={'username': user.username, 'role': user.role})
        return {"access_token": access_token}, 200

    def generate_jwt_token(self, identity):
        return create_access_token(identity=identity)
