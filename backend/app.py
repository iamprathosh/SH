from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from app.routes.auth import auth_bp
from app.routes.candidate import candidate_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/safehire'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

db = SQLAlchemy(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(candidate_bp, url_prefix='/api/candidates')

if __name__ == '__main__':
    app.run(debug=True)
