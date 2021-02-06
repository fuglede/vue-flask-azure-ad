import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    this.applicationConfig = {
      auth: {
        clientId: process.env.VUE_APP_AZURE_OAUTH_FRONTEND_APPLICATION_ID,
        authority: "https://login.microsoftonline.com/"+process.env.VUE_APP_AZURE_OAUTH_TENANCY,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };
    this.requestObj = {
      scopes: ['api://'+process.env.VUE_APP_AZURE_OAUTH_BACKEND_APPLICATION_ID+'/Read.All']

    }
    this.app = new Msal.UserAgentApplication(this.applicationConfig);
  }
  login() {
    return this.app.loginPopup(this.requestObj).then(
      idToken => {
        console.log("ID token received:");
        console.log(idToken);
        return this.app.getAccount();
      },
      error => {
        console.log(error);
        return null;
      }
    )
  }
  logout() {
    this.app.logout();
  }
  getAccount() {
    return this.app.getAccount();
  }
  getToken() {
    return this.app.acquireTokenSilent(this.requestObj).then(
      accessToken => {
        return accessToken;
      },
      error => {
        console.log(error);
        return this.app
          .acquireTokenPopup(this.requestObj)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  }
}
