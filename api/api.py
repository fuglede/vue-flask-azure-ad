from flask import Flask, jsonify
from flask_cors import CORS
from flask_azure_oauth import FlaskAzureOauth
import dotenv
import os
from pathlib import Path


app = Flask(__name__)
CORS(app)


dotenv.load_dotenv(Path(__file__).parent / '../app/.env.local')
app.config["AZURE_OAUTH_APPLICATION_ID"] = os.environ["VUE_APP_AZURE_OAUTH_BACKEND_APPLICATION_ID"]
app.config["AZURE_OAUTH_TENANCY"] = os.environ["VUE_APP_AZURE_OAUTH_TENANCY"]


auth = FlaskAzureOauth()
auth.init_app(app)


def cors(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


@app.route("/unprotected")
def unprotected():
    return cors(jsonify({"success": True}))


@app.route("/protected")
@auth()
def protected():
    return cors(jsonify({"success": True}))


@app.route("/protected-with-role")
@auth("Write.All")
def protected_with_scope():
    return cors(jsonify({"success": True}))


app.run(debug=True)
