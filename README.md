# Vue.js + MSAL.js + Flask + Azure AD authentication example

This repository contains a simple example on how to protect a Flask API endpoint with an app role defined in Azure, together with a Vue.js app for accessing this endpoint.

It is intended as a starting point for new applications that have resources that need to be secured, or as a simple collection of code samples for building authentication into existing samples.

It is inspired by the examples available in [sunilbandla/vue-msal-sample](https://github.com/sunilbandla/vue-msal-sample) and [antarctica/flask-azure-oauth](https://github.com/antarctica/flask-azure-oauth).


## Configuration

1. Create an app registration in Azure for the API project.

    a. In "Expose an API", create a scope called "Read.All", whose "Who can consent" is "Admins and users".

    b. In the "App roles" menu, create a new app role whose "Allowed member types" is "Users/Groups" and whose Value is "Write.All".

    c. In API permissions, click "Enterprise application", then in "Users and groups", add a user whose role is the one created in the step above.

2. Create an app registration in Azure for the frontend project. Use `http://localhost:8080/` as a redirect URI.

    a.  In the "Manifest" menu, define

```
	"oauth2AllowIdTokenImplicitFlow": true,
	"oauth2AllowImplicitFlow": true,
```

3. Make a copy of `app/dotenv.local.template` as `app/.env.local` and fill ID's.

4. Run the Python server:

    a. In `api`, install all requirements through `pip install -r requirements.txt`

    b. Run the Flask app through `python api.py`.

5. Run a server hosting the frontend:

    a. In `app` run `npm run serve`.