from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_graphql import GraphQLView
from flask_cors import CORS

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    @app.route("/")
    def home():
        return app.redirect("/graphql")

    with app.app_context():
        from .graphql.schema import schema
        from .models import Comment
        from .populate_db import populate_db

        db.create_all()

        if not Comment.query.first():
            print("Populating db with initial values.")
            populate_db()

        app.add_url_rule(
            "/graphql",
            view_func=GraphQLView.as_view(
                "graphql",
                schema=schema,
                graphiql=True,
            ),
        )

    return app
