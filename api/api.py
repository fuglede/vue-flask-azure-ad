from flask import Flask, jsonify
from flask_cors import CORS

from flask_azure_oauth import FlaskAzureOauth

app = Flask(__name__)
CORS(app)

app.config["AZURE_OAUTH_APPLICATION_ID"] = "{Application (client) ID for backend app registration}"
app.config["AZURE_OAUTH_TENANCY"] = "{Directory (tenant) ID}"

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
